import { Component, Inject, OnInit, Input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/core/http/repository.service';
import { WindowRefService } from 'src/app/core/services/window-ref.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html'//,
  //styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {
  private _name: string;
  fileName: any;
  //@Input() pdfFileName: string;
  public routeData;

  @Input()
  set pdfFileName(name: string) {

    this._name = name;
    this.createPdf();
  }

  get memberId(): string { return this._name; }

  private nativeWindow: Window & typeof globalThis;
  private pdfBlobUrl: string;
  sanitizedPdfBlobResourceUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private windowRefService: WindowRefService,
    private route: ActivatedRoute,
    private rep: RepositoryService) {
    console.log(data);

    if (data?.fileName) {
      // this.fileName = data.fileName;
      // this._name = this.fileName;
    }


  }

  ngOnInit() {
   
      this._name = this.route.snapshot.queryParamMap.get('name');
      console.log( "Name" + this._name);
      
    this.createPdf();
  }

  createPdf() {
    this.nativeWindow = this.windowRefService.nativeWindow;
    this.rep.get('Receipt/GetReport', this._name, { responseType: "blob" }).subscribe(pdfDataBlob => {
      const urlCreator = this.nativeWindow.URL;
      this.pdfBlobUrl = urlCreator.createObjectURL(pdfDataBlob);
      this.sanitizedPdfBlobResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfBlobUrl);
    });
  }

  printPdf() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = this.pdfBlobUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

  showPdf() {
    this.nativeWindow.open(this.pdfBlobUrl);
  }

  downloadPdf() {
    const fileName = 'test.pdf';
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = this.pdfBlobUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
  }

}
