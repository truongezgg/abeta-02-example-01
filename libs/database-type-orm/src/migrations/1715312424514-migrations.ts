import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715312424514 implements MigrationInterface {
    name = 'Migrations1715312424514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`notification_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`notification_id\` bigint UNSIGNED NOT NULL`);
    }

}
