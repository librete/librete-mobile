import {JsonObject, JsonProperty} from 'json2typescript';

import { Category } from './category';

@JsonObject
export class Note {
  @JsonProperty('url')
  url: string = undefined;

  @JsonProperty('name')
  name: string = undefined;

  @JsonProperty('author')
  authorUrl: string = undefined;

  @JsonProperty('category')
  categoryUrl: string = undefined;

  @JsonProperty('text')
  text: string = undefined;

  @JsonProperty('created_at')
  createdAt: Date = undefined;

  @JsonProperty('updated_at')
  updatedAt: Date = undefined;

  category: Category;
}
