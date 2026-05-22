using DatamigrationService as service from '../../srv/service';
annotate service.Waves with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'name',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
            Criticality : StatusCriticality,
        },
        {
            $Type : 'UI.DataField',
            Value : completionPercent,
            Label : 'completionPercent',
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'endDate',
        },
    ],
    UI.SelectionFields : [
        name,
    ],

    
);


annotate service.Waves with {
    name @(
        Common.Label : 'name',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Waves',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : name,
                    ValueListProperty : 'name',
                },
            ],
            Label : 'name',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Waves with {
    status @Common.Label : 'status'
};

annotate service.Rollouts with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'name',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionFields #filterBarMacro : [
        name,
    ],
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : waves_ID,
            Label : 'waves_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
            Criticality : StatusCriticality,
            CriticalityRepresentation : #WithoutIcon,
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : reason,
            Label : 'reason',
        },
        {
            $Type : 'UI.DataField',
            Value : actualStartDate,
            Label : 'actualStartDate',
        },
    ],
);

annotate service.Mocks with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'name',
        },
        {
            $Type : 'UI.DataField',
            Value : rollouts_ID,
            Label : 'rollouts_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionFields #filterBarMacro : [
        name,
    ],
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'name',
        },
        {
            $Type : 'UI.DataField',
            Value : rollouts_ID,
            Label : 'rollouts_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
            Criticality : StatusCriticality,
            CriticalityRepresentation : #WithoutIcon,
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'endDate',
        },
        {
            $Type : 'UI.DataField',
            Value : completionPercent,
            Label : 'completionPercent',
        },
    ],
);

annotate service.Mockstream with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : mockStreamId,
            Label : 'mockStreamId',
        },
        {
            $Type : 'UI.DataField',
            Value : mock_ID,
            Label : 'mock_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : stream_id,
            Label : 'stream_id',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'endDate',
        },
    ],
    UI.SelectionFields #filterBarMacro : [
        
    ],
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : mockStreamId,
            Label : 'mockStreamId',
        },
        {
            $Type : 'UI.DataField',
            Value : stream.name,
            Label : 'name',
        },
        {
            $Type : 'UI.DataField',
            Value : mock_ID,
            Label : 'mock_ID',
        },
        {
            $Type : 'UI.DataField',
            Value : stream_id,
            Label : 'stream_id',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'endDate',
        },
    ],
);

annotate service.MockStreamObjects with @(
    UI.LineItem #tableMacro : [
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : mockStream_mockStreamId,
            Label : 'mockStream_mockStreamId',
        },
        {
            $Type : 'UI.DataField',
            Value : object_id,
            Label : 'object_id',
        },
        {
            $Type : 'UI.DataField',
            Value : recordsLoaded,
            Label : 'recordsLoaded',
        },
        {
            $Type : 'UI.DataField',
            Value : totalRecords,
            Label : 'totalRecords',
        },
        {
            $Type : 'UI.DataField',
            Value : dataType,
            Label : 'dataType',
        },
        {
            $Type : 'UI.DataField',
            Value : extractionMethod,
            Label : 'extractionMethod',
        },
        {
            $Type : 'UI.DataField',
            Value : loadingMethod,
            Label : 'loadingMethod',
        },
        {
            $Type : 'UI.DataField',
            Value : transformationMethod,
            Label : 'transformationMethod',
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'endDate',
        },
    ],
    UI.SelectionFields #filterBarMacro : [
        loadingMethod,
        extractionMethod,
    ],
    UI.LineItem #tableMacro1 : [
        {
            $Type : 'UI.DataField',
            Value : mockStream_mockStreamId,
            Label : 'mockStream_mockStreamId',
        },
        {
            $Type : 'UI.DataField',
            Value : ID,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : object_id,
            Label : 'object_id',
        },
        {
            $Type : 'UI.DataField',
            Value : dataType,
            Label : 'dataType',
        },
        {
            $Type : 'UI.DataField',
            Value : loadingMethod,
        },
        {
            $Type : 'UI.DataField',
            Value : extractionMethod,
        },
        {
            $Type : 'UI.DataField',
            Value : transformationMethod,
            Label : 'transformationMethod',
        },
        {
            $Type : 'UI.DataField',
            Value : totalRecords,
            Label : 'totalRecords',
        },
        {
            $Type : 'UI.DataField',
            Value : recordsLoaded,
            Label : 'recordsLoaded',
        },
        {
            $Type : 'UI.DataField',
            Value : startDate,
            Label : 'startDate',
        },
        {
            $Type : 'UI.DataField',
            Value : endDate,
            Label : 'endDate',
        },
    ],
);

annotate service.Rollouts with {
    name @(
        Common.Label : 'name',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Rollouts',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : name,
                    ValueListProperty : 'name',
                },
            ],
            Label : 'Rollout Name',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Mocks with {
    name @Common.Label : 'name'
};

annotate service.Mockstream with {
    status @Common.Label : 'status'
};

annotate service.MockStreamObjects with {
    loadingMethod @(
        Common.Label : 'loadingMethod',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'MockStreamObjects',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : loadingMethod,
                    ValueListProperty : 'loadingMethod',
                },
            ],
            Label : 'LoadingMethod',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.MockStreamObjects with {
    extractionMethod @Common.Label : 'extractionMethod'


};

annotate service.Waves with @(
  UI.HeaderActions: [
    {
      $Type  : 'UI.DataFieldForAction',
      Action : 'DatamigrationService.logout',
      Label  : 'Logout'
    }
  ]
);

