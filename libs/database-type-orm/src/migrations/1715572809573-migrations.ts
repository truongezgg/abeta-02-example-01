import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715572809573 implements MigrationInterface {
    name = 'Migrations1715572809573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`request_make_friend\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`sender_id\` bigint UNSIGNED NOT NULL, \`receiver_id\` bigint UNSIGNED NOT NULL, \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted' DEFAULT 0, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`liked_post\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`status\` int UNSIGNED NOT NULL COMMENT '1: active, 0: not active' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`comment_image\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`user_notification\` CHANGE \`read\` \`read\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`request_make_friend\` ADD CONSTRAINT \`FK_1c6aa31592fde2dc45423770b10\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request_make_friend\` ADD CONSTRAINT \`FK_2a77cde44ffa0bf5970cea1dd01\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`request_make_friend\` DROP FOREIGN KEY \`FK_2a77cde44ffa0bf5970cea1dd01\``);
        await queryRunner.query(`ALTER TABLE \`request_make_friend\` DROP FOREIGN KEY \`FK_1c6aa31592fde2dc45423770b10\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` CHANGE \`read\` \`read\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment_image\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`liked_post\` DROP COLUMN \`status\``);
        await queryRunner.query(`DROP TABLE \`request_make_friend\``);
    }

}
