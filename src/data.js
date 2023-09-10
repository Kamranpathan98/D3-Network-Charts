export const nodes = [
    {
        "name": "T1I1 Trial",
        "type": "clinical-trial",
        "properties": {
            "stage": "Stage 1"
        }
    },
    {
        "name": "S1 Site",
        "type": "Site-Hospital",
        "properties": {
            "address": "1 Main St"
        }
    },
    {
        "name": "T1I2 Trial",
        "type": "clinical-trial",
        "properties": {
            "stage": "Stage 2"
        }
    },
    {
        "name": "S2 Site",
        "type": "Site-Lab",
        "properties": {
            "address": "2 Main St"
        }
    }
]; 

export const links = [
    {
        "Start": "T1I1 Trial",
        "End": "S1 Site",
        "Type": "Association-Rect",
        "Properties": null
    },
    {
        "Start": "T1I2 Trial",
        "End": "S2 Site",
        "Type": "Association-Rect",
        "Properties": null
    }
];