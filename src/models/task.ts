import {JsonObject, JsonProperty} from 'json2typescript';

import { Category } from './category';
import { Priority, Status } from '../custom-types';

@JsonObject
export class Task {
  @JsonProperty('url')
  url: string = undefined;

  @JsonProperty('name')
  name: string = undefined;

  @JsonProperty('author')
  authorUrl: string = undefined;

  @JsonProperty('category')
  categoryUrl: string = undefined;

  @JsonProperty('parent')
  parentUrl: string = undefined;

  @JsonProperty('start_date')
  startDate: Date = undefined;

  @JsonProperty('end_date')
  endDate: Date = undefined;

  @JsonProperty('description')
  description: string = undefined;

  @JsonProperty('priority')
  priority: Priority = undefined;

  @JsonProperty('status')
  status: Status = undefined;

  @JsonProperty('created_at')
  createdAt: Date = undefined;

  @JsonProperty('updated_at')
  updatedAt: Date = undefined;

  category: Category;
}
