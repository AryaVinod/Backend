import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAge1691055581790 implements MigrationInterface {
    name = 'AddedAge1691055581790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
    }

}
