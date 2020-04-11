// Build the horizontal bar chart.
function buildBarChart(sampleData) {
    // Pull the top ten values from the data array and push them into a variable.
    var topTenOtuIds = sampleData.otu_ids.slice(0, 10).map(d => "OTU " + d).reverse();
    var topTenSampleValues = sampleData.sample_values.slice(0, 10).reverse();
    var topTenSampleLabels = sampleData.otu_labels.slice(0, 10).reverse();

    // Set the trace.
    var horizontalbar = [{
        type: 'bar',
        text: topTenSampleLabels,
        x: topTenSampleValues,
        y: topTenOtuIds,
        orientation: 'h'
    }];

    // Set the layout.
    var barLayout = {
        title: "Top 10 OTUs",
        autosize: true,
        width: 600,
        height: 800,
        margin: {
            l: 100,
            r: 100,
            b: 100,
            t: 100,
            pad: 1
        },
    };

    // Plot bar chart.
    Plotly.newPlot("bar",horizontalbar, barLayout);
}

// Build the bubble chart.
function buildBubbleChart(sampleData) {
    // Pull the necessary data points from the array and push them into a variable.
    var sampleOTUids = sampleData.otu_ids;
    var sampleValues = sampleData.sample_values;

    // Set the trace.
    var trace1 = {
        x: sampleOTUids,
        y: sampleValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: sampleOTUids
        }
    };

    // Push trace into a variable.
    var bubblechart = [trace1]

    // Set the layout.
    var bubbleLayout = {
        autosize: true,
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000,
        margin: {
            l: 100,
            r: 100,
            b: 100,
            t: 100,
            pad: 1
        },
    };

    // Plot bubble chart.
    Plotly.newPlot("bubble",bubblechart, bubbleLayout);

}

// Build the demographics card.
function buildDemographicsCard(sampleMetadata) {
    // D3 select the html ID where the card will be placed.
    var demoPanel = d3.select("#sample-metadata");
    demoPanel.html("");
    // Push the key value pairs into a new variable
    var demoInfo = {
        ID: sampleMetadata.id,
        Ethnicity: sampleMetadata.ethnicity,
        Gender: sampleMetadata.gender,
        Age: sampleMetadata.age,
        Location: sampleMetadata.location,
        BBtype: sampleMetadata.bbtype,
        Wfreq: sampleMetadata.wfreq,
    };
    // Call each key value pair and append them to the #sample-metadata element.
    Object.entries(demoInfo).forEach(([key, value]) => {
        demoPanel.append('h6').text(`${key}: ${value}`);
    });

}

// Create dropdown values from the existing IDs in the samples array.
function createdropDown(samples) {
    // D3 select the html ID where the data will be placed.
    var dropdownMenu = d3.select("#selDataset");
    // Iterate trhough the ID list and append each ID to the dropdownMenu.
    samples.forEach((x) => {
        dropdownMenu
        .append("option")
        .text(x)
        .property("value", x);
    });
     
}

// Update the plotly charts and demographics card based on drop down selection.
function updatePlotly(sampleID) {
    // D3 select the html ID where the data will be placed.
    var dropdownMenu = d3.select("#selDataset")
    // Pull the selection from the value elemnet and pass it into a variable.
    var dataSet = dropdownMenu.property("value");
    // Call data.
    d3.json("./samples.json").then(function(data) {
        var samplesData = data.samples;
        var samplesMetadata = data.metadata;

        sampleIDs = [];
        // Append each ID from the samplesData array to the samplesIDs list.
        samplesData.forEach((element, index) => {
            sampleIDs.push(element.id);
        })

        // Get the index of the ID selection.
        var selDataIndex = sampleIDs.indexOf(dataSet)

        // Update each chart function using the index of the ID selection.
        buildBarChart(samplesData[selDataIndex]);        
        buildBubbleChart(samplesData[selDataIndex]);
        buildDemographicsCard(samplesMetadata[selDataIndex]);

    });

}

// Update the plotly charts each time an option is changed.
function optionChanged(sampleID) {
    updatePlotly(sampleID);
}

// Set the initial parameters for the dashboard.
function init() {
    d3.json("./samples.json").then(function(data) {
        var samplesData = data.samples;
        var samplesMetadata = data.metadata;
            console.log(samplesMetadata);
        
        buildBarChart(samplesData[0]);        
        buildBubbleChart(samplesData[0]);
        buildDemographicsCard(samplesMetadata[0]);
        createdropDown(samplesData.map(x => x.id));
    });
}
init();