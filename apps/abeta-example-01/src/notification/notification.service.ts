import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Notification from '@app/database-type-orm/entities/Notification.entity';
import { Repository } from 'typeorm';
import { OneSignal } from './onesignal';
import UserNotification from '@app/database-type-orm/entities/UserNotification.entity';
import { CreateNotificationDto } from './dtos/createNotification.dto';
import { UserService } from '../user/user.service';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';
import User from '@app/database-type-orm/entities/User';
// import { UpdateNotificationDto } from './dtos/updateNotification.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import * as assert from 'assert';
import { PagingDto } from './dtos/paging.dto';
import { assignPaging, returnPaging } from '@app/helpers';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(UserNotification)
    private userNotificationRepository: Repository<UserNotification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private oneSignal: OneSignal,
    private userService: UserService,
  ) {}
  async create(id: number, createDto: CreateNotificationDto) {
    const receiver = await this.userService.findOneById(createDto.receiverId);
    if (!receiver) {
      throw new Exception(ErrorCode.User_Not_Found);
    }
    const newNotification = await this.notificationRepository.save({
      title: createDto.title,
      content: createDto.content,
      senderId: id,
      categoryId: 3,
    });
    const newUserNotification = await this.userNotificationRepository.save({
      receiverId: createDto.receiverId,
      notificationId: newNotification.id,
      read: false,
    });

    const msg = await this.oneSignal.pushNotification(
      [receiver.subscriptionId],
      newNotification.title,
      newNotification.content,
    );
    return {
      notification: newNotification,
      userNotification: newUserNotification,
      msg,
    };
  }
  async findAll(id: number, pagingDto: PagingDto) {
    const params = assignPaging(pagingDto);
    const notification = await this.userNotificationRepository.find({
      where: {
        receiverId: id,
        deletedAt: null,
      },
      relations: {
        notification: true,
      },
      skip: params.skip,
      take: params.pageSize,
    });
    const totalNotifications = await this.userNotificationRepository.count({
      where: {
        receiverId: id,
        deletedAt: null,
      },
    });
    const pagingResult = returnPaging(notification, totalNotifications, params);
    return {
      notifications: pagingResult,
    };
  }
  async update(id: number, updateData: Partial<User>) {
    const notif = await this.notificationRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });
    if (!notif) {
      throw new Exception(ErrorCode.Notification_Not_Found);
    }
    Object.assign(notif, updateData);
    return this.notificationRepository.update(id, updateData);
  }
  async delete(id: number) {
    const notif = await this.notificationRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });
    if (!notif) {
      throw new Exception(ErrorCode.Notification_Not_Found);
    }
    return this.notificationRepository.update(
      { id: id },
      { deletedAt: new Date().toISOString() },
    );
  }
  async updateReadStatus(id: number) {
    const notif = await this.userNotificationRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });
    if (!notif) {
      throw new Exception(ErrorCode.Notification_Not_Found);
    }
    return this.userNotificationRepository.update({ id: id }, { read: true });
  }

  async readAllNotification(id: number) {
    const notifications = await this.userNotificationRepository.find({
      where: {
        receiverId: id,
        deletedAt: null,
        read: false,
      },
    });
    for (const notification of notifications) {
      notification.read = true;
      await this.notificationRepository.save(notification);
      await this.userNotificationRepository.update(
        { id: notification.id },
        { read: true },
      );
    }
    return notifications;
  }
}
