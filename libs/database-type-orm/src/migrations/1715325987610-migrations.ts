import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715325987610 implements MigrationInterface {
    name = 'Migrations1715325987610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`config\` (\`key\` varchar(200) NOT NULL, \`name\` varchar(255) NOT NULL, \`value\` text NOT NULL, \`type\` varchar(50) NULL, \`order\` tinyint NULL, \`is_system\` tinyint NULL, \`created_by\` bigint UNSIGNED NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`liked_post\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`post_id\` bigint UNSIGNED NOT NULL COMMENT 'id of the liked post', \`user_id\` bigint UNSIGNED NOT NULL COMMENT 'id of the user likes the post', \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`like_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`comment_id\` int UNSIGNED NOT NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`post_id\` bigint UNSIGNED NOT NULL, \`user_id\` bigint UNSIGNED NOT NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_image\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`post_id\` bigint UNSIGNED NOT NULL, \`url\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(500) NOT NULL, \`user_id\` bigint UNSIGNED NOT NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_notification\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`receiver_id\` bigint UNSIGNED NOT NULL, \`notification_id\` bigint UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(500) NOT NULL, \`sender_id\` bigint UNSIGNED NOT NULL, \`notification_id\` bigint UNSIGNED NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user-image\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`url\` varchar(255) NOT NULL, \`image_type\` int UNSIGNED NOT NULL COMMENT '1: profile image, 2: wall image', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email_otp\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`otp\` varchar(255) NOT NULL, \`user_id\` bigint UNSIGNED NOT NULL, \`is_expired\` tinyint NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b3792cb3215196a4a08feb0dd3\` (\`otp\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(100) NULL, \`name\` varchar(100) NULL, \`phone_number\` varchar(100) NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`reset_token\` varchar(100) NULL, \`refresh_token\` varchar(500) NULL, \`date_of_birth\` varchar(255) NULL, \`address\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment_image\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`comment_id\` int UNSIGNED NOT NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_7349ffa72fa7f92e3ded3e3cdb\` (\`comment_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`liked_post\` ADD CONSTRAINT \`FK_eef0f0d08d82c1a9a8ff5ec8df0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`liked_post\` ADD CONSTRAINT \`FK_e5d1a5eb90faf85fb12c747d548\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD CONSTRAINT \`FK_8fe1ba7f6e2df973b54b45b8b31\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like_comment\` ADD CONSTRAINT \`FK_f558e9d904087a2ff3f723f1d20\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_image\` ADD CONSTRAINT \`FK_c75a6b8c090482abc8597fd7dfc\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_notification\` ADD CONSTRAINT \`FK_61c95c494f10013151aa9c5e349\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_notification\` ADD CONSTRAINT \`FK_db8be208a22e59619d1e38cc831\` FOREIGN KEY (\`notification_id\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_56023c91b76b36125acd4dcd9c5\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-image\` ADD CONSTRAINT \`FK_2981efd0201426d6ad0a412aae1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_otp\` ADD CONSTRAINT \`FK_ca8abd38e38111f43217d502863\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment_image\` ADD CONSTRAINT \`FK_7349ffa72fa7f92e3ded3e3cdb1\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment_image\` DROP FOREIGN KEY \`FK_7349ffa72fa7f92e3ded3e3cdb1\``);
        await queryRunner.query(`ALTER TABLE \`email_otp\` DROP FOREIGN KEY \`FK_ca8abd38e38111f43217d502863\``);
        await queryRunner.query(`ALTER TABLE \`user-image\` DROP FOREIGN KEY \`FK_2981efd0201426d6ad0a412aae1\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_56023c91b76b36125acd4dcd9c5\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` DROP FOREIGN KEY \`FK_db8be208a22e59619d1e38cc831\``);
        await queryRunner.query(`ALTER TABLE \`user_notification\` DROP FOREIGN KEY \`FK_61c95c494f10013151aa9c5e349\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`post_image\` DROP FOREIGN KEY \`FK_c75a6b8c090482abc8597fd7dfc\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_f558e9d904087a2ff3f723f1d20\``);
        await queryRunner.query(`ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_8fe1ba7f6e2df973b54b45b8b31\``);
        await queryRunner.query(`ALTER TABLE \`liked_post\` DROP FOREIGN KEY \`FK_e5d1a5eb90faf85fb12c747d548\``);
        await queryRunner.query(`ALTER TABLE \`liked_post\` DROP FOREIGN KEY \`FK_eef0f0d08d82c1a9a8ff5ec8df0\``);
        await queryRunner.query(`DROP INDEX \`REL_7349ffa72fa7f92e3ded3e3cdb\` ON \`comment_image\``);
        await queryRunner.query(`DROP TABLE \`comment_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3792cb3215196a4a08feb0dd3\` ON \`email_otp\``);
        await queryRunner.query(`DROP TABLE \`email_otp\``);
        await queryRunner.query(`DROP TABLE \`user-image\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`user_notification\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`post_image\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`like_comment\``);
        await queryRunner.query(`DROP TABLE \`liked_post\``);
        await queryRunner.query(`DROP TABLE \`config\``);
    }

}
