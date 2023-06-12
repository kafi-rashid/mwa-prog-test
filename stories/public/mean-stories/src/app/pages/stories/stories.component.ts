import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/shared/models/story.model';
import { StoryService } from 'src/app/shared/services/story.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stories: Story[] = new Array<Story>();
  currentPage: number = 0;

  offset: number = 0;
  count: number = 20;

  query: string = "";

  constructor(private _storyService: StoryService) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories() {
    let query = "";
    query += "offset=" + this.offset;
    query += "&count=" + this.count;
    this._storyService.getAll(query).subscribe({
      next: (response: any) => {
        this.stories = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  goPrev() {
    if (this.offset > 0) {
      this.offset -= this.count;
      this.getStories();
    }
  }

  goNext() {
    this.offset += this.count;
    this.getStories();
  }

}
