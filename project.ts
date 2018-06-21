import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Observable } from "rxjs";
import { ComponentBase, BindingModel, AppSettings, LoggerService } from "@es-dp/core";
import { HeaderActions } from "@es-dp/header";
import { FdpTableSettings, SearchTypes } from "@es-dp/controls";
import { DateComparisonType } from "@es-dp/common";
import { ProjectAction } from "project.actions";
import { ProjectData, ProjectStore, BannerSettings } from "project.store";


@Component({
    selector: "project-summary",
    templateUrl: "./project-summary.container.html",
    styleUrls: ['./project-summary.container.scss']
})

export class ProjectSummaryContainer extends ComponentBase implements OnInit, OnDestroy {
    public topBannerForm:FormGroup;
    public settings: FdpTableSettings; 
    public bannerInfo$ : Observable<BindingModel<BannerSettings>>;
    public operations$: Observable<BindingModel<any>>;
    public projectId:string;
    public disabled: boolean = true;

    private projectDetails: any;
    private containerHeight: string;
    private renderOperationLink: any;
    

    constructor(private headerAction: HeaderActions,
        private projectStore: ProjectStore,
        private projectAction: ProjectAction,
        private logger: LoggerService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private titleService: Title) {
            super();
            this.activatedRoute.params.subscribe(params => this.projectId = params['id']);
            this.renderOperationLink = (id) => (`<a>${id}</a>`);
    }
    
    ngOnInit() {
        this.logger.info("Initializing project summary container");
        if (this.projectId) {
            this.titleService.setTitle(this.projectId);
            this.headerAction.updatePageTitle(this.projectId);
        }
        this.projectSummaryForm();       
        this.bannerInfo$ = this.projectStore.project().bannerInfoData();
        this.operations$ = this.projectStore.project().oprationList();
        this.projectAction.getBannerInfo(this.projectId);
        this.projectAction.getOperationsByProjectId(this.projectId);
        
        this.setContainerHeight();
        this.settings = {
            columns: [
                { text: 'Operation Number', datafield: 'OperationNumber', minWidth: '130px', type: 'string', renderer: this.renderOperationLink },
                { text: 'Operation Name', datafield: 'OperationName', type: 'string', minWidth: '150px' },
                { text: 'No. of Ops Activities', datafield: 'OperationActivitiesCount', minWidth: '100px', type: 'number' },
                { text: 'Well Name and Number(s)', datafield: 'WellName', type: 'string', minWidth: '150px' },
                { text: 'Sub Product Line(s)', datafield: 'SubProductLines', type: 'string', minWidth: '150px' },
                { text: 'Operation Status', datafield: 'Status', type: 'string', minWidth: '120px' },
                { text: 'Est. Ops Start', datafield: 'OpsStart', type: 'date', format: 'DD-MMM-YYYY', comparisonType: DateComparisonType.Equal, width: '120px', minWidth: '120px' },
                { text: 'Est. Ops End', datafield: 'OpsEnd', type: 'date', format: 'DD-MMM-YYYY', comparisonType: DateComparisonType.Equal, width: '120px', minWidth: '120px' },                
                { text: 'Created By', datafield: 'CreatedBy', type: 'string', minWidth: '150px' },
                { text: 'Last Updated', datafield: 'UpdatedDate', type: 'date', format: 'DD-MMM-YYYY', comparisonType: DateComparisonType.Equal, width: '120px', minWidth: '120px' },
                { text: 'Last Updated By', datafield: 'UpdatedBy', type: 'string', minWidth: '150px' }
            ],
            width: '100%',
            height: this.containerHeight,
            uniqueDatafield: 'OperationNumber',
            search: SearchTypes.LocalSearch,
            allowSort: true
        };        
    }

    ngOnDestroy() {
        this.logger.info("Destroying Project Summary Component");
        this.destroy();
        this.projectAction.resetReferenceObservables();
    }

    private projectSummaryForm() {
        this.topBannerForm = this.formBuilder.group({});
    }


    /**
     * Handle navigate to operation when clicked
     * @param cellObject object containing row and column details
     */

    public cellDataClicked(cellObject: any) {
        if(cellObject.column == 'OperationNumber') {
            let url = '#/operation/'+cellObject.dataValue;
            window.open(url, url);
        }
    }

    public createOperation() {
        let url = '#/project/' + this.projectId + '/operation/new';
        this.logger.info("create Operation: " + url);
        window.open(url, "_blank");
    }

    //adjust container height
    setContainerHeight() {
        this.containerHeight = (window.innerHeight - 235) + 'px';
    }

    /**
     * Adjust height on browser window resize
     */
    @HostListener('window:resize', ['$event'])
    private onResize(event) {
        this.setContainerHeight();
    }
    
}
