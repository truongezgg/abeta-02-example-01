import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714986998438 implements MigrationInterface {
    name = 'Migrations1714986998438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`type\` \`type\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`order\` \`order\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`is_system\` \`is_system\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`created_by\` \`created_by\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_8fe1ba7f6e2df973b54b45b8b31\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_f558e9d904087a2ff3f723f1d20\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` CHANGE \`user_id\` \`user_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` CHANGE \`comment_id\` \`comment_id\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\``);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`post_id\` \`post_id\` bigint UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`user_id\` \`user_id\` bigint UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_id\` \`user_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reset_token\` \`reset_token\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`invited_by\` \`invited_by\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD CONSTRAINT \`FK_8fe1ba7f6e2df973b54b45b8b31\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD CONSTRAINT \`FK_f558e9d904087a2ff3f723f1d20\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_f558e9d904087a2ff3f723f1d20\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_8fe1ba7f6e2df973b54b45b8b31\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`invited_by\` \`invited_by\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(500) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reset_token\` \`reset_token\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone_number\` \`phone_number\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`user_id\` \`user_id\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`user_id\` \`user_id\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`post_id\` \`post_id\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` CHANGE \`comment_id\` \`comment_id\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` CHANGE \`user_id\` \`user_id\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD CONSTRAINT \`FK_f558e9d904087a2ff3f723f1d20\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD CONSTRAINT \`FK_8fe1ba7f6e2df973b54b45b8b31\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`created_by\` \`created_by\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`is_system\` \`is_system\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`order\` \`order\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`config\` CHANGE \`type\` \`type\` varchar(50) NULL DEFAULT 'NULL'`);
    }

}
