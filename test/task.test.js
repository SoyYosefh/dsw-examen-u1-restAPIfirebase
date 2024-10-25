const request = require("supertest");
const chai = require("chai");
const sinon = require("sinon");

const app = require("../app");

const expect = chai.expect;

describe("1- Test de la ruta /user", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app).post("/user/").send({
            username: "Jaime",
            password: "12345"
        });
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("user");
        expect(response.body.user).to.have.property("apikey");

        console.log(response.body);
    });
});

describe("2- Test de la ruta /auth/login", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app).post("/auth/login").send({
            username: "Jaime",
            password: "12345"
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("token");
        expect(response.body.user).to.have.property("apikey");

        console.log(response.body);
    });
});


describe("4- Test de la ruta /tareas/ para crear una tarea", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app).post("/tareas/").send({
            name: "Tarea 1 de Jaime",
            description: "Este es la tarea 1",
            startDate: "2024-01-01",
            endDate: "2024-06-01",
            status: "Terminado",
            apikey: "$2a$10$CUn8J/weXtLopB3Eg1kWLeaOhu/EpNGmF2hvBjMCDtCUIxcwkmk82"
        });

        expect(response.status).to.equal(201); // Cambia a 201 si es creación
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("description");
        expect(response.body).to.have.property("startDate");
        expect(response.body).to.have.property("endDate");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("usuario");
        expect(response.body).to.have.property("createdAt");

        console.log(response.body);

    });
});

describe("3- Test de la ruta /tareas/", () => {
    it("Debería devolver un array con todas las tareas", async () => {
        const response = await request(app)
            .get("/tareas/")
            .send({ apikey: "$2a$10$CUn8J/weXtLopB3Eg1kWLeaOhu/EpNGmF2hvBjMCDtCUIxcwkmk82" });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");

        console.log(response.body);
    });
});

describe("5- Test de la ruta /tareas/:id para actualizar una tarea", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app)
            .put("/tareas/Tarea_1_de_Jaime_25-10-2024_15h-34m-56s")
            .send({
                name: "Tarea de Jaime Actualizada",
                description: "Descripción detallada de la nueva Tarea.",
                startDate: "2024-10-22",
                endDate: "2024-12-31",
                status: "Terminada",
                apikey: "$2a$10$CUn8J/weXtLopB3Eg1kWLeaOhu/EpNGmF2hvBjMCDtCUIxcwkmk82"
            });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("success");
        expect(response.body).to.have.property("message");

        console.log(response.body);

    });
});

describe("6- Test de la ruta /tareas/:id/terminada para actualizar el estatus de una tarea a terminada", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app)
            .patch("/tareas/Tarea_1_de_Jaime_25-10-2024_15h-34m-56s/terminada")
            .send({
                apikey: "$2a$10$CUn8J/weXtLopB3Eg1kWLeaOhu/EpNGmF2hvBjMCDtCUIxcwkmk82"
            });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("success");
        expect(response.body).to.have.property("message");

        console.log(response.body);

    });
});

describe("7- Test de la ruta /tareas/:id/terminada para actualizar el estatus de una tarea a No terminada", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app)
            .patch("/tareas/Tarea_1_de_Jaime_25-10-2024_15h-34m-56s/no-terminada")
            .send({
                apikey: "$2a$10$CUn8J/weXtLopB3Eg1kWLeaOhu/EpNGmF2hvBjMCDtCUIxcwkmk82"
            });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("success");
        expect(response.body).to.have.property("message");

        console.log(response.body);

    });
});

describe("8- Test de la ruta /tareas/:id para eliminar una tarea", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app)
            .delete("/tareas/Tarea_1_de_Jaime_25-10-2024_15h-34m-56s")
            .send({
                apikey: "$2a$10$CUn8J/weXtLopB3Eg1kWLeaOhu/EpNGmF2hvBjMCDtCUIxcwkmk82"
            });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("success");
        expect(response.body).to.have.property("message");

        console.log(response.body);

    });
});