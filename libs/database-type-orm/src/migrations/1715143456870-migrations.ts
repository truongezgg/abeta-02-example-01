import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715143456870 implements MigrationInterface {
    name = 'Migrations1715143456870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_otp\` ADD \`is_expired\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_otp\` DROP COLUMN \`is_expired\``);
    }

}
