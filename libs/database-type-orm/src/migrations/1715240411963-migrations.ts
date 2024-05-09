import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715240411963 implements MigrationInterface {
    name = 'Migrations1715240411963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_otp\` ADD UNIQUE INDEX \`IDX_b3792cb3215196a4a08feb0dd3\` (\`otp\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`date_of_birth\` \`date_of_birth\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`date_of_birth\` \`date_of_birth\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_otp\` DROP INDEX \`IDX_b3792cb3215196a4a08feb0dd3\``);
    }

}
