import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

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
  story_line;
  arrLength = this.contents.length;


  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }




  ngOnInit() {

    this.story_bg = document.querySelector('.story-bg');
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
      this.currentIteration = counter;
      // Add class to loaded lines

     const activatedLine = this.story_line.children[counter];
    //  console.log(activatedLine);
      this.renderer.addClass(activatedLine, 'loaded');

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
    if ( counter > - 1 ) {
      const removedLine = this.story_line.children[counter + 1];
      this.renderer.removeClass(removedLine, 'loaded');
    }
    this.iterate2(counter);
  }




  clearTime() {

    console.log(this.timeOut);
    clearTimeout(this.timeOut);

  }





}
