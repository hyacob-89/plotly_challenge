d3.json("./samples.json").then(function(data) {
    // console.log(data);
    var samplesData = data.samples;
    console.log(samplesData);

    var samplesValues = samplesData.map(sData => sData.sample_values);
    // console.log(samplesValues);
    var otuIDS = samplesData.map(sData => sData.otu_ids);
    // console.log(otuIDS);
    var otuLables = samplesData.map(sData => sData.otu_labels);
    // console.log(otuLables);




    // var horizontalbar = [{
    //     type: 'bar',
    //     x: samplesValues,
    //     y: otuIDS,
    //     orientation: 'h'
    // }];

    // var layout = {
    //     title: "Top 10 OTUs"
    // };


    // Plotly.newPlot("bar",horizontalbar, layout);

});