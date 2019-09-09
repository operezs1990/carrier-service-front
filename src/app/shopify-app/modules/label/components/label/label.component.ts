import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { PesLabel } from 'app/shopify-app/models/pes-label';
import { LabeltService } from '../../services/label.service';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  labelList: Array<PesLabel>;
  label: PesLabel;
  @ViewChild('content') content: ElementRef;


  constructor(public labelService: LabeltService,
              public translate: TranslateService) {
  }

  ngOnInit() {
    this.getStaticMnifest();
  }

  getStaticMnifest() {
    this.labelService.getStaticLabel().subscribe(res => {
      this.label = res;
      console.log(this.label);
    },
      err => console.log(err),
      () => this.label,
    );
  }


  captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 215;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth / canvas.width) + 7;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'A4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

// downloadPdf() {
//   let doc = new jsPDF();

//   let specialElementHandlers = {
//     '#editor': function (element, rendered) {
//       return true;
//     }
//   };

//   let content = this.content.nativeElement;
//   doc.fromHTML(content.innerHTML, 15, 15, {
//     'width': 190,
//     'elementHandlers': specialElementHandlers,
//   });

//   doc.save('test.pdf');

// }

}
