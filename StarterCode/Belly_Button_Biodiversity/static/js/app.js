d3.json("./samples.json").then(function(data) {

    var samplesData = data.samples;
    var samplesMetadata = data.metadata;
    // console.log(samplesData);
    console.log(samplesMetadata);
    
    
    samplesData.sort(function(a, b) {
        return ((a.sample_values > b.sample_values) ? -1 : ((a.sample_values == b.sample_values) ? 0 : 1));
    });



    var topTenIds = [];
    var topTenOtuIds = [];
    var topTenSampleValues = [];

    samplesData.forEach((element, index) => {
        topTenIds.push(element.id);
        topTenOtuIds.push(element.otu_ids.slice(0, 10).map(d => "OTU " + d));
        topTenSampleValues.push(element.sample_values.slice(0, 10));
    });

    var metaIDs = [];
    // var metaIDs = [];
    // var metaIDs = [];

    samplesMetadata.forEach((element, index) => {
        metaIDs.push(element.id);
        // topTenOtuIds.push(element.otu_ids.slice(0, 10).map(d => "OTU " + d));
        // topTenSampleValues.push(element.sample_values.slice(0, 10));
    });

    console.log(metaIDs);


    function buildCharts(dataChange) {
        d3.json("./samples.json").then(function(data) {
            var samplesData = data.samples;
            
            var topTenIds = [];
            var topTenOtuIds = [];
            var topTenSampleValues = [];
            var topTenSampleLabels = [];

            samplesData.forEach((element, index) => {
                topTenIds.push(element.id);
                topTenOtuIds.push(element.otu_ids.slice(0, 10).reverse().map(d => "OTU " + d));
                topTenSampleValues.push(element.sample_values.slice(0, 10).reverse());
                topTenSampleLabels.push(element.sample_labels.slice(0, 10).reverse());
            });
            
            // var initialViewOtuID = samplesData[115].otu_ids.slice(0, 10).reverse();
            // var initialViewValue = samplesData[115].sample_values.slice(0, 10).reverse();
            // var initialViewLabels = samplesData[115].otu_labels.slice(0, 10).reverse();

            var newIDelements = [];
            topTenIds.forEach((element, index) => {
                newIDelements.push("OTU " + element.toString());
            });

            // console.log(newIDelements);

            var horizontalbar = [{
                type: 'bar',
                text: topTenSampleLabels,
                x: topTenSampleValues,
                y: newIDelements,
                orientation: 'h'
            }];

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

            Plotly.newPlot("bar",horizontalbar, barLayout);

            var sampleOTUids = samplesData.map(sData => sData.otu_ids);
            var sampleValues = samplesData.map(sData => sData.sample_values);

            var trace1 = {
                x: sampleOTUids,
                y: sampleValues,
                mode: 'markers',
                marker: {
                    size: sampleValues,
                    color: sampleOTUids
                }
            };

            var bubblechart = [trace1]

            var bubbleLayout = {
                autosize: true,
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1200,
                margin: {
                    l: 100,
                    r: 100,
                    b: 100,
                    t: 100,
                    pad: 1
                },
            };

            Plotly.newPlot("bubble",bubblechart, bubbleLayout);
        });
    }

    function buildMeta(dataChange) {

        var sample_metadata = d3.select("#sample-metadata");

        sample_metadata.html("");

        Object.entries(dataChange).forEach(function ([key, value]) {
            var row = sample_metadata.append("p");
            row.text(`${key}: ${value} \n`);
        });

    }

    function init() {

        var selection = d3.select("#selDataset");

        var sampleIDs = samplesData.map(sData => sData.id);


        metaIDs.forEach((dataChange) => {
            selection
            .append("option")
            .text(dataChange)
            .property("value", dataChange);
        });

        var initialID = sampleIDs;
        buildCharts(initialID);
        buildMeta(initialID);

    };
    init()

    // function optionChanged(newData) {
    //     buildCharts(newData);
    //     buildMeta(newData);
    // };





});
