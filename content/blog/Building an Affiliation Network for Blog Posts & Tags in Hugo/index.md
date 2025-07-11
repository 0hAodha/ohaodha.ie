+++
title = 'Building an Affiliation Network for Blog Posts & Tags in Hugo'
date = 2025-06-10T21:32:55+01:00
draft = false
tags = ["article", "mathematics", "web", "programming", "tutorial"]
+++

<style>
    svg text {
        fill: currentColor;
    }
</style>

<figure>
    <svg></svg>
    <figcaption>An interactive affiliation network built for blog posts & tags on this website</figcaption>
</figure>

## Introduction
Hugo websites typically consist of blog posts, which are organised into taxonomies with the use of *tags*.
In a typical Hugo website, these tags are listed for each blog post, and a tags page can be used to navigate the blog posts belonging to each tag (although I suspect that tagging blog posts is one of those features that developers implement because they feel that they should, despite the end user probably never using said feature);
clearly, I am one of those developers who has implemented tagging on their blog website despite not being sure that anyone actually uses it, just on the off-chance that someone might one day want to take a look at everything I've written on a given topic.

However, I wondered if there was a better way by which I could display these relationships between blog posts and tags in a way that was easier to navigate or simply more visually interesting than listing tags & blog posts, and the knowledge graph in the note-taking application [Obsidian](https://obsidian.md/) immediately came to mind: a visualisation of the interconnections between individual notes in the user's "vault", with each node representing a single note and each edge representing a link between that note and another.
While I suspect that this graph visualisation is not actually useful for navigation compared to traditional search methods, it certainly serves its other purpose of *looking cool*.

![Obsidian & its graph view](./images/Obsidian_desktop_demo_workflow.jpg "Obsidian & its graph view [[WikiMedia Commons]](https://commons.wikimedia.org/wiki/File:Obsidian_desktop_demo_workflow.jpg)")

Such a graph is not particularly suitable for my application as this website doesn't have a great deal of linking in-between posts; in fact, at time of writing, I don't believe there are any cross-links between posts on this website.
Instead, posts are tagged, and so the nature of the graph constructed on the data is very different:
the Obsidian graph view is a **simple[^1] directed graph**, with edges indicating the direction of the link from one note to another.
In contrast, to construct a meaningful graph of connections between posts on this website, an **affiliation network** would be the best choice: a simple[^1], undirected, *bipartite* graph wherein there are two distinct types of nodes representing two distinct kinds of entities, typically individuals & groups, and in this case, blog posts & tags.
A **bipartite graph** is a graph $G=(X,E)$ consisting of a node set $X$ and an edge set *E*, where $X$ can be divided into two disjoint subsets $X_1$ & $X_2$ such that:
- $X_1 \cap X_2 = \emptyset$: that is, the two subsets are completely disjoint and share no nodes between them.
- $X_1 \cup X_2 = X$: that is, each node in $X$ is in either $X_1$ or $X_2$ --- there are no missing nodes.
- $X_1$ and $X_2$ are both **independent sets**: no pair of nodes in either $X_1$ or $X_2$ are connected by an edge --- any edges within the graph connect a node in $X_1$ to a node in $X_2$ (and vice-versa, as the edges are undirected), never a node in $X_1$ to another node in $X_1$, or a node in $X_2$ to another node in $X_2$.

## Building the Graph
Since this affiliation network will be part of the website and displayed on the [Tags](/tags) page going forward, it will almost certainly be updated repeatedly as time goes on, so the version of the code referred to here will be the first working version of the code published, and will not refer to subsequent versions.
Furthermore, I imagine the code may need to be tweaked or refactored as the size of the graph grows, so the graph data used for this post will be static from the time of writing:
the data displayed in the graph at the top of this page is not updated with subsequent builds of the website, unlike the graph displayed on the [Tags](/tags) page, which is updated with each build.


To display an affiliation graph of the relationships between tags & blog posts on this website, it was first necessary to obtain a representation of this graph in a machine-readable format.
When a website is built in Hugo, HTML files are produced, with the HTML file for each blog post typically containing the tags associated with that blog post, a HTML file for each tag being generated which links to all the blog posts which belong to that taxonomy, and a tags page being generated which lists all the tags used on the website.
I chose to use a Python script using the [Beautiful Soup](https://beautiful-soup-4.readthedocs.io/en/latest/) HTML parsing library to extract the tags from each blog post on the website:

```python {linenostart=8}
def list_blog_posts(blog_directory):
    """
    Returns a list of all the blog post slugs generated by Hugo in the build process, i.e.,
    not the titles of blog posts but the string used to identify the blog post in its URL.

    Args:
        blog_directory (str): the path to the /public/blog sub-directory of the Hugo project.

    Returns:
        list: a list of the blog post slugs in the blog_directory, in str form.
    """

    return [ directory for directory in os.listdir(blog_directory) if os.path.isdir(os.path.join(blog_directory, directory)) ]


def extract_title(blog_post, blog_directory):
    """
    Extracts the title of the given blog post from its HTML.

    Args:
        blog_post (str): the blog post slug in the blog_directory.
        blog_directory (str): the path to the /public/blog sub-directory of the Hugo project.

    Returns:
        str: the title of the blog post.
    """

    with open(blog_directory + "/" + blog_post + "/index.html", "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
        title_element = soup.find(id="blogpost-title")
        return title_element.get_text()


def extract_tags(blog_post, blog_directory):
    """
    Extracts the tags of the given blog post from its HTML.

    Args:
        blog_post (str): the blog post slug in the blog_directory.
        blog_directory (str): the path to the /public/blog sub-directory of the Hugo project.

    Returns:
        list: a list of str tags.
    """

    with open(blog_directory + "/" + blog_post + "/index.html", "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
        tags_div = soup.find("div", id="tags")
        tag_links = tags_div.find_all("a")
        return ["".join(str(child).lower() for child in a.contents) for a in tag_links]
```

I then used the `networkx` package to build the graph in Python, which can then be written to a JSON file using `json.dump()`:

```python {linenostart=60}
def build_affiliation_network(blog_posts, blog_directory):
    """
    Builds an affiliation network consisting of a bipartite node set of blog post
    nodes & tag nodes, with an edge between two nodes if the blog post has that tag.

    Args:
        blog_posts (list): a list of the blog post slugs in the blog_directory, in str form.
        blog_directory (str): the path to the /public/blog sub-directory of the Hugo project.

    Returns:
        networkx.classes.graph.Graph: a networkx graph object representing the affiliation networka
    """

    graph = nx.Graph()

    for blog_post in blog_posts:
        title = extract_title(blog_post, blog_directory)
        graph.add_node(blog_post, title=title)

        tags = extract_tags(blog_post, blog_directory)
        graph.add_edges_from([ (blog_post, tag) for tag in tags ])

    return graph

def main():
    blog_directory = "./public/blog/"
    blog_posts = list_blog_posts(blog_directory)

    affiliation_network = build_affiliation_network(blog_posts, blog_directory)
    graph_data = nx.node_link_data(affiliation_network)

    with open("./public/blog/graph.json", "w") as f:
        json.dump(graph_data, f)
```

A (prettified) sample of the output JSON is as follows:

```json
{
  "directed": false,
  "multigraph": false,
  "graph": {},
  "nodes": [
    {
      "id": "article"
    },
    ,
    {
      "title": "What Does unlink Actually Do?",
      "id": "what-does-unlink-actually-do"
    },
    {
      "id": "linux"
    },
    {
      "id": "shell"
    }
  ],
  "links": [
    {
      "source": "article",
      "target": "what-does-unlink-actually-do"
    },
    {
      "source": "what-does-unlink-actually-do",
      "target": "linux"
    },
    {
      "source": "what-does-unlink-actually-do",
      "target": "shell"
    }
  ]
}
```

The blog post nodes can be implicitly distinguished from the tags nodes on the basis that the blog post nodes will have an associated `title` attribute whereas the tag nodes will not;
a more robust & generalisable solution could be to tag each node with the values `"blogpost"` or `"tag"` as appropriate, but is not necessary for our purposes.


The Python script to build this affiliation network and create the associated JSON file is run automatically as part of the GitHub Action that I use to build & deploy this website, using the following additional steps in the configuration of the `build` job:
```yaml {linenostart=63}
      - name: Install Python dependencies
        run: pip install -r scripts/requirements.txt
      - name: Generate affiliation network
        run: python3 scripts/graph.py
```

## Displaying the Graph
I chose to use [D3.js](https://d3js.org/) to create the graph, chosen for its flexibility & interactive nature, using the [`d3-force`](https://d3js.org/d3-force) layout and largely based upon the [disjoint force-directed graph](https://observablehq.com/@d3/disjoint-force-directed-graph/2) example available in the documentation.

The JavaScript for the graph itself is included directly in the `content/tags/_index.md` Hugo file for this website (and also here within this page).
The nodes of the graph are colour-coded, with <span style="color: #B0CFFF">■</span>`#B0CFFF` blue representing blog post nodes and <span style="color: #FFA7CE">■</span>`#FFA7CE` pink representing tag nodes.
Each node is labelled, with blog post nodes displaying the title of the blog post which they represent in a serif font, and tag nodes displaying the name of the tag prepended with a `#` symbol in a monospace font;
the labels for both types of node are clickable links either to the blog post itself or the page listing all the posts associated with the tag.

This project has been my first foray into data visualisation with D3.js, and while I am pleased with the result, it's nonetheless quite likely that my code contains a number of rookie mistakes, so if you find any, please do let me know!
The HTML & JavaScript for the visualisation itself can be seen below:

```html
<style>
    svg text {
        fill: currentColor;
    }
</style>
<svg></svg>

<script type="module">
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawChart() {
    const response = await fetch("./files/graph.json");
    const data = await response.json();

    const width = 1000;
    const height = 600;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map(d => ({ ...d }));
    const nodes = data.nodes.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value || 1));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", d => d.title ? 12 : 8)
        .attr("fill", d => d.title ? "#B0CFFF" : "#FFA7CE")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title").text(d => d.id);

    const label = svg.append("g")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(nodes)
        .join("a")
        .attr("xlink:href", d => d.title ? `/blog/${d.id}` : `/tags/${d.id}`)
        .attr("target", "_blank") // Open in new tab
        .append("text")
        .attr("font-family", d => d.title ? "inherit" : "monospace")
        .attr("font-size", d => d.title ? 16 : 12)
        .text(d => d.title ? d.title : "#" + d.id);

    simulation
        .force("labelCollision", d3.forceCollide()
        .radius(20)
        .strength(0.5));

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y - 12);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    document.querySelector("svg").replaceWith(svg.node());
}

drawChart();
</script>
```

{{< raw >}}
<script type="module">
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawChart() {
    const response = await fetch("./files/graph.json");
    const data = await response.json();

    const width = 1000;
    const height = 600;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map(d => ({ ...d }));
    const nodes = data.nodes.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value || 1));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", d => d.title ? 12 : 8)
        .attr("fill", d => d.title ? "#B0CFFF" : "#FFA7CE")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title").text(d => d.id);

    const label = svg.append("g")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(nodes)
        .join("a")
        .attr("xlink:href", d => d.title ? `/blog/${d.id}` : `/tags/${d.id}`)
        .attr("target", "_blank") // Open in new tab
        .append("text")
        .attr("font-family", d => d.title ? "inherit" : "monospace")
        .attr("font-size", d => d.title ? 16 : 12)
        .text(d => d.title ? d.title : "#" + d.id);

    simulation
        .force("labelCollision", d3.forceCollide()
        .radius(20)
        .strength(0.5));

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y - 12);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    document.querySelector("svg").replaceWith(svg.node());
}

drawChart();
</script>
{{< /raw >}}

[^1]: Here, the word "simple" doesn't refer to the complexity of the graph or the difficulty of constructing such a graph, but is a technical term that means that the graph cannot contain edges from a node to itself, and there cannot be multiple edges between the same pair of nodes; of course, in Obsidian it is possible to have several links between a pair of notes, but these are represented in the graph with a single edge, and similarly self-referential links are not displayed.



