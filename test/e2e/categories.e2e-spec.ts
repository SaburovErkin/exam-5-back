import { INestApplication } from '@nestjs/common';
import {Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Category } from '../../src/entities/category.entity';


describe('UserController (e2e', () =>{
    let app: INestApplication;

    let createdCategory = Category

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

    describe('create category (POST)', () => {
        const createCategoryTest = {
        category: 'tesla'
        };
        it('car create', () => {
            return request(app.getHttpServer())
            .post('/categories')
            .send(createCategoryTest)
            .expect(401)
            .then(({body}) => {
                createdCategory = body
            })
        })
    })

    describe('get car (GET)', () => {
        it('car get', () => {
            return request(app.getHttpServer())
            .get('/categories')
            .expect(401)
        })
    })

    describe('get /category by id (GET:ID)', () => {
        it('category id', () => {
            return request(app.getHttpServer())
            .get(`/categories/${createdCategory.id}`)
            .expect(401)
        })
    })

    describe('delete /category by id (DELETE)', () => {
        it('category id', () => {
            return request(app.getHttpServer())
            .delete(`/categories/${createdCategory.id}`)
            .expect(401)
        })
    })

    describe('patch /category by id (UPDATE)', () => {
        const updateCategoryTest = {
            category: 'ferrari'
        };
        it('category id', () => {
            return request(app.getHttpServer())
            .patch(`/categories/${createdCategory.id}`)
            .send(updateCategoryTest)
            .expect(401)
        })
    })

    
} )