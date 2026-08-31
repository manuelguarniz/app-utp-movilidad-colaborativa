import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const API_BASE = "http://localhost:3000/api";

const buildUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(["driver", "passenger", "admin"]),
  createdAt: faker.date.recent().toISOString(),
  ...overrides,
});

const buildDashboardStats = () => ({
  travelers: faker.number.int({ min: 20, max: 220 }),
  activeTrips: faker.number.int({ min: 8, max: 80 }),
  satisfaction: Number(
    faker.number.float({ min: 4.2, max: 4.9, fractionDigits: 1 }).toFixed(1),
  ),
  city: faker.location.city(),
  updatedAt: new Date().toISOString(),
});

export const handlers = [
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: "Email y contraseña requeridos" },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        token: faker.string.alphanumeric(24),
        user: buildUser({
          email: body.email,
          name: body.email.split("@")[0] ?? "Usuario",
        }),
      },
      { status: 200 },
    );
  }),

  http.post(`${API_BASE}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!body.name || !body.email || !body.password) {
      return HttpResponse.json(
        { message: "Faltan datos obligatorios" },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        message: "Usuario registrado correctamente",
        user: buildUser({
          name: body.name,
          email: body.email,
        }),
      },
      { status: 201 },
    );
  }),

  http.get(`${API_BASE}/dashboard/stats`, () => {
    return HttpResponse.json(buildDashboardStats(), { status: 200 });
  }),

  http.post(`${API_BASE}/rides/create`, async ({ request }) => {
    const body = (await request.json()) as { from?: string; to?: string };

    return HttpResponse.json(
      {
        ok: true,
        id: faker.string.uuid(),
        route: {
          from: body?.from ?? faker.location.city(),
          to: body?.to ?? faker.location.city(),
        },
        status: "scheduled",
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),

  http.get(`${API_BASE}/rides`, () => {
    return HttpResponse.json(
      {
        data: Array.from({ length: 4 }, () => ({
          id: faker.string.uuid(),
          driver: faker.person.fullName(),
          from: faker.location.city(),
          to: faker.location.city(),
          seats: faker.number.int({ min: 1, max: 4 }),
          status: faker.helpers.arrayElement([
            "pending",
            "confirmed",
            "completed",
          ]),
        })),
      },
      { status: 200 },
    );
  }),
];
