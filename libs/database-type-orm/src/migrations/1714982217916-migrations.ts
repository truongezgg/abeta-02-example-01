import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714982217916 implements MigrationInterface {
    name = 'Migrations1714982217916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_56023c91b76b36125acd4dcd9c5\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_56023c91b76b36125acd4dcd9c5\``);
    }

}
