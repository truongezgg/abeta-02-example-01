import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715205707922 implements MigrationInterface {
  name = 'Migrations1715205707922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9760fe6d517741390584ed2bc0\` ON \`comment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` CHANGE \`status\` \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted' DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_make_friend\` CHANGE \`status\` \`status\` tinyint NOT NULL COMMENT 'true: accepted, false: havent ever accepted'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_9760fe6d517741390584ed2bc0\` ON \`comment\` (\`comment_image_id\`)`,
    );
  }
}
