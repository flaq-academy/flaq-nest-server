import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtsService } from '../utils/jwt/jwt.service';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../utils/jwt/schema/Refreshtoken';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign, CampaignSchema } from './schema/campaigns.schema';
import {
  ParticipateCampaign,
  ParticipateCampaignSchema,
} from './schema/participate.schema';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { QuizEntries, QuizEntriesSchema } from './schema/quiz_entries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: ParticipateCampaign.name, schema: ParticipateCampaignSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: QuizEntries.name, schema: QuizEntriesSchema },
    ]),
    UserModule,
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, JwtsService, AuthService],
})
export class CampaignsModule {}
