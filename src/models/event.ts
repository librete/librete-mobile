import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Event {
  @JsonProperty('url')
  url: string = undefined;

  @JsonProperty('name')
  name: string = undefined;

  @JsonProperty('author')
  authorUrl: string = undefined;

  @JsonProperty('category')
  categoryUrl: string = undefined;

  @JsonProperty('start_date')
  startDate: Date = undefined;

  @JsonProperty('end_date')
  endDate: Date = undefined;

  @JsonProperty('created_at')
  createdAt: Date = undefined;

  @JsonProperty('updated_at')
  updatedAt: Date = undefined;

  @JsonProperty('location')
  location: string = undefined;

  @JsonProperty('description')
  description: string = undefined;
}
