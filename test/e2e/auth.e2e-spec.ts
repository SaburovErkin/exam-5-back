import { INestApplication } from '@nestjs/common';
import {Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';


describe('UserController (e2e', () =>{
    let app: INestApplication;

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

    describe('create register POST', () => {
        const registerTest = {
            firstname: 'ali',
            lastname: 'aliyev',
            phone: '90000000',
            email: 'ali@gmail.com',
            password: '12345',
        };
        it('user register', () => {
            return request(app.getHttpServer())
            .post('/auth/register')
            .send(registerTest)
            .expect(201)
        })
    })


    describe('create login POST', () => {
        const loginTest = {
            email: 'ali@gmail.com',
            password: '12345',
        };
        it('user login', () => {
            return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginTest)
            .expect(201)
        })
    })

    describe('create car POST', () => {
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
        })
    })

    // it('/(GET)', () => {
    //     return request(app.getHttpServer())
    //         .get('/')
    //         .expect(200)
    //         .expect('Hell oworld');
    // });
} )