import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714979178874 implements MigrationInterface {
    name = 'Migrations1714979178874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_super_admin\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`none_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`invited_by\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone_number\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reset_token\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reset_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`invited_by\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`none_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_super_admin\` tinyint NOT NULL DEFAULT '0'`);
    }

}
