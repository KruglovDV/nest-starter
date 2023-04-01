import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserFirstname1680364798143 implements MigrationInterface {
    name = 'addUserFirstname1680364798143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    }

}
