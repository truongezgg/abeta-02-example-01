import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715134429880 implements MigrationInterface {
  name = 'Migrations1715134429880';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comment_image\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`comment_id\` int UNSIGNED NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_7349ffa72fa7f92e3ded3e3cdb\` (\`comment_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`request_make_friend\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`sender_id\` bigint UNSIGNED NOT NULL, \`receiver_id\` bigint UNSIGNED NOT NULL, \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted', \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`comment_image_id\` int UNSIGNED NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD UNIQUE INDEX \`IDX_9760fe6d517741390584ed2bc0\` (\`comment_image_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_9760fe6d517741390584ed2bc0\` ON \`comment\` (\`comment_image_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment_image\` ADD CONSTRAINT \`FK_7349ffa72fa7f92e3ded3e3cdb1\` FOREIGN KEY (\`comment_id\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_9760fe6d517741390584ed2bc04\` FOREIGN KEY (\`comment_image_id\`) REFERENCES \`comment_image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` ADD CONSTRAINT \`FK_1c6aa31592fde2dc45423770b10\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` ADD CONSTRAINT \`FK_2a77cde44ffa0bf5970cea1dd01\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` DROP FOREIGN KEY \`FK_2a77cde44ffa0bf5970cea1dd01\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` DROP FOREIGN KEY \`FK_1c6aa31592fde2dc45423770b10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_9760fe6d517741390584ed2bc04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment_image\` DROP FOREIGN KEY \`FK_7349ffa72fa7f92e3ded3e3cdb1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_9760fe6d517741390584ed2bc0\` ON \`comment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP INDEX \`IDX_9760fe6d517741390584ed2bc0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`comment_image_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`like_comment\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(`DROP TABLE \`request_make_friend\``);
    await queryRunner.query(
      `DROP INDEX \`REL_7349ffa72fa7f92e3ded3e3cdb\` ON \`comment_image\``,
    );
    await queryRunner.query(`DROP TABLE \`comment_image\``);
  }
}
