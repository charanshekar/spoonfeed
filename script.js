let toggle=false;
angular.module('spoonFeed',[])
.controller('mainCtrl',[function(){
        var self=this;
        let filteredcurrently=false;
        self.filteredarray=[];
        self.availabletags=[];
        self.posts=[
            {id:1,title:'Bankrupt Maker Faire revives, reduced to Make Community',source:'Techcrunch',tag:'Technology',img:'techcrunch.png',show:true},
            {id:2,title:"Get a taste of mischievous 'Beetlejuice' musical with 'Beautiful Sound' video",source:'Mashable',tag:'Entertainment',img:'mashable.jpg',show:true},
            {id:3,title:"Spider-Man: Far From Home's Mysterio Concept Art Is Even Weirder",source:'Gizmodo',tag:'Entertainment',img:'io9.png',show:true},  
            {id:4,title:'Waiting For The Revolution At Soccer Analytics Bootcamp',source:'Deadspin',tag:  'Sports',img:'deadspin.jpg',show:true},
            {id:5,title:"Chase customers have ONE MONTH left to opt out of binding arbitration",source:'Boing',tag:'Political',img:'boing.jpg',show:true},
            {id:6,title:"The Best Amazon Prime Day Deal is Actually at Whole Foods",source:'LifeHacker',tag:'Lifestyle',img:'lifehacker.png',show:true},
            {id:7,title:"The Oldest Ceramista in Brazil",source:'Jezebel',tag:'Arbitrary',img:'jezebel.jpg',show:true},
            {id:8,title:"What World Of Warcraft Would Look Like Running In Unreal Engine 4",source:"Kotaku",tag:"Gaming",img:"kotaku.jpg",show:true},
            {id:9,title:"What It's Like to Use a 641 HP Lamborghini Urus as an Actual Family Car",source:"Jalopnik",tag:"Cars",img:"jalopnik.webp",show:true},
            {id:10,title:'Bankrupt Maker Faire revives, reduced to Make Community',source:'Techcrunch',tag:'Technology',img:'techcrunch.png',show:true},
            {id:11,title:"Get a taste of mischievous 'Beetlejuice' musical with 'Beautiful Sound' video",source:'Mashable',tag:'Entertainment',img:'mashable.jpg',show:true},
            {id:12,title:"Spider-Man: Far From Home's Mysterio Concept Art Is Even Weirder",source:'Gizmodo',tag:'Entertainment',img:'io9.png',show:true}              
        ];
        self.countTimes = (current) =>{
            let count=0;
            for(i=current;i<self.posts.length;i++)
            {
                if(self.posts[current].tag===self.posts[i].tag)
                {
                    count++;
                }
            }
            return count;
        };
        self.countNooftimes = () =>{
            for(f=0;f<self.posts.length;f++)
            {
              tagcount={
                  id:f+1,
                  tag:self.posts[f].tag,
                  countrepeat:self.countTimes(f)
              };
                  if(self.availabletags.findIndex(tfind => tfind.tag === tagcount.tag) === -1){
                      self.availabletags.push(tagcount);
                  }
            }
        };
        self.sortByTag = (tag) =>{ 
            let flagforfilter=false;

            if(filteredcurrently)
            {   
                self.posts.map(fcmap => fcmap.show=true);
            }
            else
            {
            self.filteredarray.push(tag);
            }
            for(k=0;k<self.filteredarray.length;k++)
            {
                if(tag===self.filteredarray[k])
                {
                    flagforfilter=true;
                    break;
                }
            }
            if(!flagforfilter)
            self.filteredarray.push(tag);
           self.posts.map(fcmap => fcmap.show=false);
            for(i=0;i<self.filteredarray.length;i++)
            {
                for(j=0;j<self.posts.length;j++)
                if(self.filteredarray[i] === self.posts[j].tag)
                {
                    self.posts[j].show=true;
                }
            }
            filteredcurrently=true;
            self.chipdisplay=true;
        };
        self.clearfilter = (fid) =>{
            if(self.filteredarray.length === 1)
            {
                self.posts.map(fcmap => fcmap.show=true);
                self.chipdisplay=false;
            }
            else
            for(i=0;i<self.posts.length;i++)
            {
            if(self.filteredarray[fid]===self.posts[i].tag)
            self.posts[i].show=false;
            }
            self.filteredarray.splice(fid,1);
        };

}]);
$(document).ready(function(){
    $(".close").click(function(){
        $(".full-page-search").fadeOut(300,'swing');
        document.getElementById('search-text').value = '';
        $(".searchbutton").css("display","block");
        $(".collapse-trigger").css("display","block");
    });
    $(".searchbutton").click(function(){
        $(".full-page-search").show();
        $("#search-text").focus();
        $(".searchbutton").css("display","none");
        $(".collapse-trigger").css("display","none");
    });
});
$(document).ready(function(){
    $(".searchbutton").on("keyup",function(){
        var value=$(this).val();
        $(".mainContent *").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        $("#search-text").keyup(function(e){
        if(e.keyCode == 13)
           {
        $(this).trigger("keyup");
        $(".full-page-search").fadeOut(300,'swing');
        }
        });
    });
    $(".collapse-trigger").on("click",function(){
        if(toggle===false)
        {
        $(".top").css("transform","rotate(50deg) translateY(6px)");
        $(".bottom").css("transform","rotate(-50deg) translate(7px,-13px)");
        $(".middle").css("opacity","0");
        $(".vertical-navbar").css("margin-left","0%");
        toggle=true;
        }
        else
        {
        $(".top").css("transform","rotate(0deg) translateY(0px)");
        $(".bottom").css("transform","rotate(0deg) translate(0px,0px)");
        $(".middle").css("opacity","1");
        $(".vertical-navbar").css("margin-left","-10%");
        toggle=false;
        }
    });
});