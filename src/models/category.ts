import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Category {
  @JsonProperty('url')
  url: string = undefined;

  @JsonProperty('name')
  name: string = undefined;

  @JsonProperty('author')
  authorUrl: string = undefined;

  @JsonProperty('events')
  events: Array<string> = undefined;

  @JsonProperty('tasks')
  tasks: Array<string> = undefined;

  @JsonProperty('notes')
  notes: Array<string> = undefined;

  @JsonProperty('created_at')
  createdAt: Date = undefined;

  @JsonProperty('updated_at')
  updatedAt: Date  = undefined;

  @JsonProperty('description')
  description: string  = undefined;
}
