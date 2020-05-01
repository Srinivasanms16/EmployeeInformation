import {Directive,HostBinding,HostListener,Input,ElementRef,Renderer2,OnInit} from '@angular/core'
import employee from "../Services/employee"

@Directive({
    selector:'[highlight]'
})
export class attributehighlight implements OnInit{

    @Input("highlight")
    emp:employee;

     spanele:any;

    constructor(private el:ElementRef,private render:Renderer2){}
    ngOnInit(){
    this.spanele =   this.el.nativeElement.querySelector("span[isactive]");
    }
   // <!--bg-danger text-white-->
    @HostBinding('class.bg-danger')
    backgroundcolour:boolean;

    @HostBinding('class.text-white')
    textcolour:boolean;


    @HostListener('mouseover')
    over(){
               this.backgroundcolour = true;
               this.textcolour = true;
               let classname = this.emp.isActive ? "text-info":"text-warning"
            this.render.addClass(this.spanele, classname);
    }

    @HostListener('mouseleave')
    leave(){
        this.backgroundcolour = false;
        this.textcolour = false;
        this.render.removeClass(this.spanele,"text-warning")
        this.render.removeClass(this.spanele,"text-info")
    }

}