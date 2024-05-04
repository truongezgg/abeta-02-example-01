import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1714817224948 implements MigrationInterface {
  name = 'Migrations1714817224948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user_image\` (
                \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'ID auto increment',
                \`image_location\` varchar(500) NOT NULL,
                \`user_id\` int NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`like\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`user_id\` int NULL COMMENT 'ID auto increment',
                \`post_id\` int UNSIGNED NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`post\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`content\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL COMMENT 'Timestamp of creation' DEFAULT CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL COMMENT 'Timestamp of creation',
                \`updated_at\` datetime(6) NOT NULL COMMENT 'Timestamp of last update' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`user_id\` int NULL COMMENT 'ID auto increment',
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`like_comment\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`user_id\` int NULL COMMENT 'ID auto increment',
                \`comment_id\` int UNSIGNED NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`comment\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
                \`content\` varchar(255) NOT NULL,
                \`user_id\` int NULL COMMENT 'ID auto increment',
                \`post_id\` int UNSIGNED NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`notification_category\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`type_name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`notification\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`content\` varchar(500) NOT NULL,
                \`read\` tinyint NOT NULL,
                \`sender_id\` int NOT NULL,
                \`receiver_id\` int NOT NULL,
                \`category_id\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'ID auto increment',
                \`email\` varchar(255) NOT NULL COMMENT 'User''s email address.',
                \`password\` varchar(100) NOT NULL COMMENT 'User''s hashed password.',
                \`name\` varchar(100) NULL COMMENT 'User''s name',
                \`status\` tinyint NOT NULL COMMENT '1: active, 0: inactive' DEFAULT '1',
                \`phone_number\` varchar(255) NULL COMMENT 'User''s phone number',
                \`refresh_token\` varchar(500) NULL COMMENT 'JWT refresh token, make sure only one refresh token is active.',
                \`reset_token\` varchar(500) NULL COMMENT 'JWT reset password token, make sure only one reset token is active.',
                \`created_at\` datetime(6) NOT NULL COMMENT 'Timestamp of creation' DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL COMMENT 'Timestamp of last update' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`email_otp\` (
                \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'ID auto increment',
                \`otp\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_image\`
            ADD CONSTRAINT \`FK_60db7aa78ee9dfbdbd4c7311a05\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_4356ac2f9519c7404a2869f1691\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_d41caa70371e578e2a4791a88ae\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like_comment\`
            ADD CONSTRAINT \`FK_8fe1ba7f6e2df973b54b45b8b31\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like_comment\`
            ADD CONSTRAINT \`FK_f558e9d904087a2ff3f723f1d20\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`notification\`
            ADD CONSTRAINT \`FK_56023c91b76b36125acd4dcd9c5\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`notification\`
            ADD CONSTRAINT \`FK_90543bacf107cdd564e9b62cd20\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`notification\`
            ADD CONSTRAINT \`FK_1c1ca42fa0d288c36d739c36e7b\` FOREIGN KEY (\`category_id\`) REFERENCES \`notification_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1c1ca42fa0d288c36d739c36e7b\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_90543bacf107cdd564e9b62cd20\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_56023c91b76b36125acd4dcd9c5\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_f558e9d904087a2ff3f723f1d20\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like_comment\` DROP FOREIGN KEY \`FK_8fe1ba7f6e2df973b54b45b8b31\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_d41caa70371e578e2a4791a88ae\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_4356ac2f9519c7404a2869f1691\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_image\` DROP FOREIGN KEY \`FK_60db7aa78ee9dfbdbd4c7311a05\`
        `);
    await queryRunner.query(`
            DROP TABLE \`email_otp\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`notification\`
        `);
    await queryRunner.query(`
            DROP TABLE \`notification_category\`
        `);
    await queryRunner.query(`
            DROP TABLE \`comment\`
        `);
    await queryRunner.query(`
            DROP TABLE \`like_comment\`
        `);
    await queryRunner.query(`
            DROP TABLE \`post\`
        `);
    await queryRunner.query(`
            DROP TABLE \`like\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_image\`
        `);
  }
}
