import { MigrationInterface, QueryRunner } from "typeorm";

export class removeFirstNameColumn1680365490926 implements MigrationInterface {
    name = 'removeFirstNameColumn1680365490926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
    }

}
