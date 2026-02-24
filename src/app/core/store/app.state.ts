import { AuthState } from './auth/auth.state';
import { CampaignState } from '../../features/campaigns/store/campaign.state';
import { ContactState } from '../../features/contacts/store/contact.state';
import { AutomationState } from '../../features/automation/store/automation.state';

export interface AppState {
  auth: AuthState;
  campaigns: CampaignState;
  contacts: ContactState;
  automation: AutomationState;
}
