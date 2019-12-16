import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Download extends Model {
  static table = 'downloads';

  @field('remote_url') remoteUrl;
  @field('local_url') localUrl;
  @field('name') name;
  @field('size') size;
  @field('file_type') fileType;
}
