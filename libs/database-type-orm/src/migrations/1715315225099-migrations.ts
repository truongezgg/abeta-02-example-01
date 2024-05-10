import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715315225099 implements MigrationInterface {
    name = 'Migrations1715315225099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_notification\` ADD \`read\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_notification\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_notification\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_notification\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`category_id\` varchar(255) NOT NULL COMMENT '1: comment, 2: like, 3: friend request'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` DROP COLUMN \`read\``);
    }

}
