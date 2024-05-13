import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715386103512 implements MigrationInterface {
  name = 'Migrations1715386103512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_9760fe6d517741390584ed2bc04\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_9760fe6d517741390584ed2bc0\` ON \`comment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`comment_image_id\` \`status\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`notification_id\` \`category_id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`email_otp\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`otp\` varchar(255) NOT NULL, \`user_id\` bigint UNSIGNED NOT NULL, \`is_expired\` tinyint NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b3792cb3215196a4a08feb0dd3\` (\`otp\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`liked_post\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD \`status\` int UNSIGNED NOT NULL COMMENT '1: active, 0: not active' DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` ADD \`read\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`date_of_birth\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment_image\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` DROP COLUMN \`category_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD \`category_id\` varchar(255) NOT NULL COMMENT '1: comment, 2: like, 3: friend request'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_otp\` ADD CONSTRAINT \`FK_ca8abd38e38111f43217d502863\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`email_otp\` DROP FOREIGN KEY \`FK_ca8abd38e38111f43217d502863\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` DROP COLUMN \`category_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD \`category_id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`status\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment_image\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`date_of_birth\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_notification\` DROP COLUMN \`read\``,
    );
    await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`liked_post\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b3792cb3215196a4a08feb0dd3\` ON \`email_otp\``,
    );
    await queryRunner.query(`DROP TABLE \`email_otp\``);
    await queryRunner.query(
      `ALTER TABLE \`notification\` CHANGE \`category_id\` \`notification_id\` bigint UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` CHANGE \`status\` \`comment_image_id\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_9760fe6d517741390584ed2bc0\` ON \`comment\` (\`comment_image_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_9760fe6d517741390584ed2bc04\` FOREIGN KEY (\`comment_image_id\`) REFERENCES \`comment_image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
