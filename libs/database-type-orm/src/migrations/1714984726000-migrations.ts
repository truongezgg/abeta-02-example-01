import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714984726000 implements MigrationInterface {
    name = 'Migrations1714984726000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`config\` (\`key\` varchar(200) NOT NULL, \`name\` varchar(255) NOT NULL, \`value\` text NOT NULL, \`type\` varchar(50) NULL, \`order\` tinyint NULL, \`is_system\` tinyint NULL, \`created_by\` bigint UNSIGNED NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`like_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NULL, \`comment_id\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`user_id\` bigint UNSIGNED NULL, \`post_id\` bigint UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` bigint UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(100) NULL, \`name\` varchar(100) NULL, \`phone_number\` varchar(100) NULL, \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`reset_token\` varchar(100) NULL, \`refresh_token\` varchar(500) NULL, \`invited_by\` bigint UNSIGNED NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`like_comment\``);
        await queryRunner.query(`DROP TABLE \`config\``);
    }

}
