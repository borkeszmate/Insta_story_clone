import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  contents = [
    {img: '../../../assets/img/1.jpg', navigateLink: '1', headline: 'Headline 1 Lorem Ipsum lorem'},
    { img: '../../../assets/img/2.jpg', navigateLink: '2', headline: 'Headline 2 Lorem Ipsum lorem'  },
    { img: '../../../assets/img/3.jpg', navigateLink: '3', headline: 'Headline 3 Lorem Ipsum lorem' },
    { img: '../../../assets/img/4.jpg', navigateLink: '4', headline: 'Headline 4 Lorem Ipsum lorem' },
    { img: '../../../assets/img/5.jpg', navigateLink: '5', headline: 'Headline 5 Lorem Ipsum lorem' },
    { img: '../../../assets/img/6.jpg', navigateLink: '6', headline: 'Headline 6 Lorem Ipsum lorem' },
  ];



  currentContent = this.contents[0].img;
  currentHeadline = this.contents[0].headline;
  actualCard = 1;
  currentIteration = 0;
  timeOut;
  testTime;
  story_bg;
  story_line;
  arrLength = this.contents.length;


  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }




  ngOnInit() {

    this.story_bg = document.querySelector('.story-bg');
    // this.story_bg.style.backgroundImage = `url(${this.currentContent})`;
    this.story_line = document.querySelector('.story__line');

    this.createLines();
    this.iterate2(this.currentIteration);

  }




  createLines() {

    for (let i = 0 ; i < this.arrLength; i++) {
      const div = this.renderer.createElement('div');

      div.classList.add(`story__line__item`);


      this.renderer.appendChild(this.story_line, div);

    }

  }




  iterate2(counter) {

    if (counter < this.arrLength && counter > -1) {
      this.currentContent = this.contents[counter].img;
      this.currentHeadline = this.contents[counter].headline;
      this.story_bg.style.backgroundImage = `url(${this.currentContent})`;
      this.currentIteration = counter;
      // Add class to loaded lines

     const activatedLine = this.story_line.children[counter];
    //  console.log(activatedLine);
      this.renderer.addClass(activatedLine, 'loaded');

     this.timeOut = setTimeout(() => {
        this.currentContent = this.contents[counter].img;
        this.currentHeadline = this.contents[counter].headline;
        console.log(this.currentHeadline);
       this.story_bg.style.backgroundImage = `url(${this.currentContent})`;

        this.iterate2(counter + 1);

      }, 3000);
    }
    // Start from the beginning
    // if ( counter === this.arrLength) {
    //   this.iterate2(0);

    // }
  }




  jumpForward() {
    clearTimeout(this.timeOut);
    const counter = this.currentIteration + 1;
    if (counter > - 1) {

      const skippedLine = this.story_line.children[counter - 1 ];
      this.renderer.removeClass(skippedLine, 'loaded');

      this.renderer.addClass(skippedLine, 'skipped');

    }
    this.iterate2(counter);

  }




  jumpBackward() {
    clearTimeout(this.timeOut);
    let counter;
    if ( this.currentIteration !== 0 ) {
      counter = this.currentIteration - 1;

    } else {
       counter = this.currentIteration;
       console.log('első');
    }

      const removedLine = this.story_line.children[counter + 1];
      const currentLine = this.story_line.children[counter];
      this.renderer.removeClass(removedLine, 'loaded');
      this.renderer.removeClass(removedLine, 'skipped');

      this.renderer.removeClass(currentLine, 'loaded');
      this.renderer.removeClass(currentLine, 'skipped');
      setTimeout(() => {
        this.iterate2(counter);
      }, 10);

  }




  clearTime() {

    // console.log(this.timeOut);
    clearTimeout(this.timeOut);

  }





}
