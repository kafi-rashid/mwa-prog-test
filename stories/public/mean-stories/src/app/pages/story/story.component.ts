import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Story } from 'src/app/shared/models/story.model';
import { StoryService } from 'src/app/shared/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  story: Story = new Story();

  constructor(private _storyService: StoryService,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const storyId = this._activatedRoute.snapshot.params["storyId"];
    if (storyId) {
      this.getStory(storyId);
    }
  }

  getStory(storyId: string) {
    this._storyService.getStoryById(storyId).subscribe({
      next: (response: any) => {
        this.story = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updatePopularity(storyId: string) {
    this._storyService.changePopularity(storyId).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          alert("Popularity updated!");
          this.getStory(storyId);
        }
      },
      error: (error) => {
        console.log(error);        
      }
    })
  }

}
