import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { ConfirmDialogService } from './services/confirm-dialog.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    providers: [
        ConfirmDialogService,
    ]
})
export class ConfirmDialogModule { }