import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contents = [
    {img: '../../../assets/img/1.jpg', navigateLink: '1'},
    { img: '../../../assets/img/2.jpg', navigateLink: '2' },
    { img: '../../../assets/img/3.jpg', navigateLink: '3' },
    { img: '../../../assets/img/4.jpg', navigateLink: '4' },
    { img: '../../../assets/img/5.jpg', navigateLink: '5' },
    { img: '../../../assets/img/6.jpg', navigateLink: '6' },
  ];

  currentContent = this.contents[0].img;
  actualCard = 1;
  currentIteration = 0;
  timeOut;
  testTime;
  story_bg;

  arrLength = this.contents.length;
  constructor() { }

  ngOnInit() {

    this.story_bg = document.querySelector('.story-bg');

    this.iterate2(this.currentIteration);

  }

  iterate2(counter) {

    if (counter < this.arrLength && counter > -1) {
      this.currentContent = this.contents[counter].img;
      this.currentIteration = counter;

     this.timeOut = setTimeout(() => {
        this.currentContent = this.contents[counter].img;
        this.iterate2(counter + 1);
      }, 3000);
    }
  }

  jumpForward() {
    clearTimeout(this.timeOut);
    const counter = this.currentIteration + 1;
    console.log(counter);
    this.iterate2(counter);
  }

  jumpBackward() {
    clearTimeout(this.timeOut);
    const counter = this.currentIteration - 1;
    console.log(counter);
    this.iterate2(counter);
  }

  clearTime() {

    console.log(this.timeOut);
    clearTimeout(this.timeOut);

  }





}
