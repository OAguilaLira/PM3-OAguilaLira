import { AppointmentRepository } from "../../../src/repositories/appointmentRepository";
import { Service } from "../../../src/entities/Service";
import { AppointmentEntity } from "../../../src/entities/Appointment";
import { AppointmentService } from "../../../src/services/appointmentsServices";
import { ServiceService } from "../../../src/services/servicesServices";
import { UserService } from "../../../src/services/userServices";
import { calculateEndDate } from "../../../src/utils/appointmentUtils";
import { UserEntity } from "../../../src/entities/User";
import { create } from "domain";

jest.mock("../../../src/utils/appointmentUtils", () => ({
  calculateEndDate: jest.fn(),
}));

// Mocks para las dependencias
const mockAppointmentRepository = {
  isSlotTaken: jest.fn(),
  create: jest.fn(),
};

const mockServicesService = {
  findOneById: jest.fn(),
};

const mockUserService = {
  findOneById: jest.fn(),
};

describe("AppointmentService", () => {
  let service: AppointmentService;

  beforeEach(() => {
    // Reiniciar mocks antes de cada prueba
    jest.clearAllMocks();

    // Crear instancia del servicio con dependencias mockeadas
    service = new AppointmentService(
      mockAppointmentRepository as unknown as AppointmentRepository,
      mockServicesService as unknown as ServiceService,
      mockUserService as unknown as UserService
    );
  });

  describe("createAppointment", () => {
    it("debe crear una cita si el horario está disponible", async () => {
      // Configurar mocks
      const mockService = {
        id: "1",
        name: "Corte Cabello",
        durationMinutes: 30,
      } as Service;
      const mockStartDate = new Date("2024-05-01T10:00:00");
      const mockEndDate = new Date("2024-05-01T10:30:00");
      const mockUser = {
        id: "3",
        name: "Sersenio",
        nDni: "121313",
        birthdate: "2024-05-11",
        email: "om@example.com",
      } as unknown as UserEntity;
      const mockAppointment = {
        id: "2",
        endDate: new Date("2024-05-01T10:30:00"),
        startDate: new Date("2024-05-01T10:00:00"),
        status: "active",
        service: mockService as Service,
        user: mockUser as UserEntity,
        notes: "",
      } as AppointmentEntity;

      const mockCreateAppointmentResponse = {
        message: "Turno creado con exito",
        appointment: mockAppointment,
      } as any;

      (calculateEndDate as jest.Mock).mockReturnValue(
        new Date("2024-05-01T10:30:00")
      );

      mockAppointmentRepository.isSlotTaken.mockResolvedValue(false);
      mockAppointmentRepository.create.mockResolvedValue(mockAppointment);
      mockServicesService.findOneById.mockResolvedValue(mockService);
      mockUserService.findOneById.mockResolvedValue(mockUser);

      // Ejecutar método
      const result = await service.createAppointment({
        serviceId: "1",
        date: mockStartDate,
        userId: "1",
      });

      // Verificar resultados
      expect(mockAppointmentRepository.isSlotTaken).toHaveBeenCalledWith(
        "1",
        mockStartDate,
        mockEndDate
      );
      expect(mockAppointmentRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockCreateAppointmentResponse);
    });

    it("debe lanzar error si el horario está ocupado", async () => {
      const mockService = {
        id: "1",
        name: "Corte Cabello",
        durationMinutes: 30,
      } as Service;
      const mockStartDate = new Date("2024-05-01T10:00:00");

      mockAppointmentRepository.isSlotTaken.mockResolvedValue(true);

      // Verificar que se lance el error
      await expect(
        service.createAppointment({
          serviceId: "1",
          date: mockStartDate,
          userId: "1",
        })
      ).rejects.toThrow("El horario indicadon no está disponible");
    });
  });
});
