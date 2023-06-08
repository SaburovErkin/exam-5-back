import { INestApplication } from '@nestjs/common';
import {Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Car } from '../../src/entities/car.entity';


describe('UserController (e2e', () =>{
    let app: INestApplication;
    let createdCar = Car

    beforeAll(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    })

    afterAll( async () => {
        await app.close();
    })

    describe('create car (POST)', () => {
        const createCarTest = {
        marka: "damas",
        tanirovka: "yes",
        motor: "1.6",
        year: "2015",
        color: "oq",
        distance: "10000km",
        gearbook: "idk",
        price: "500$",
        description: "good car"
        };
        it('car create', () => {
            return request(app.getHttpServer())
            .post('/cars')
            .send(createCarTest)
            .expect(401)
            .then(({body}) => {
                createdCar = body
            })
        })
    })

    describe('get car (GET)', () => {
        it('car get', () => {
            return request(app.getHttpServer())
            .get('/cars')
            .expect(401)
        })
    })

    describe('get /car by id (GET:ID)', () => {
        it('car id', () => {
            return request(app.getHttpServer())
            .get(`/cars/${createdCar.id}`)
            .expect(401)
        })
    })

    describe('delete /car by id (DELETE)', () => {
        it('car id', () => {
            return request(app.getHttpServer())
            .delete(`/cars/${createdCar.id}`)
            .expect(401)
        })
    })

    describe('patch /car by id (UPDATE)', () => {
        const updateCarTest = {
            marka: "damas",
            tanirovka: "yes",
            motor: "1.6",
            year: "2015",
            color: "oq",
            distance: "10000km",
            gearbook: "idk",
            price: "500$",
            description: "good car"
        };
        it('car id', () => {
            return request(app.getHttpServer())
            .patch(`/cars/${createdCar.id}`)
            .send(updateCarTest)
            .expect(401)
        })
    })
} )