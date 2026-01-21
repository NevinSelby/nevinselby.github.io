
import { useMemo, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { data as siteData } from '@/content/data';
import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { ChevronRight } from 'lucide-react';

interface GraphNode {
    id: string;
    name: string;
    type: 'root' | 'category' | 'skill' | 'project' | 'article' | 'experience';
    val: number;
    color: string;
    x?: number;
    y?: number;
}

interface GraphLink {
    source: string;
    target: string;
}

const KnowledgeCanvas = () => {
    const fgRef = useRef<any>(null);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [hoverNode, setHoverNode] = useState<string | null>(null);

    const graphData = useMemo(() => {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];

        // 1. Root Node (The Sun)
        nodes.push({
            id: 'me',
            name: siteData.profile.name,
            type: 'root',
            val: 40,
            color: '#2563eb' // Blue 600
        });

        // 2. Experience Nodes (Planets)
        siteData.experience.forEach(exp => {
            nodes.push({
                id: exp.slug,
                name: exp.company,
                type: 'experience',
                val: 25,
                color: '#8b5cf6' // Purple 500
            });
            links.push({ source: 'me', target: exp.slug });
        });

        // 3. Skill Category Nodes
        siteData.skills.forEach(cat => {
            const catId = `cat-${cat.category}`;
            nodes.push({
                id: catId,
                name: cat.category,
                type: 'category',
                val: 22,
                color: '#3b82f6' // Blue 500
            });
            links.push({ source: 'me', target: catId });

            // Specific Skills (Moons)
            cat.skills.forEach(skill => {
                nodes.push({
                    id: skill,
                    name: skill,
                    type: 'skill',
                    val: 12,
                    color: '#93c5fd' // Blue 300
                });
                links.push({ source: catId, target: skill });
            });
        });

        // 4. Project Nodes
        siteData.projects.forEach(project => {
            nodes.push({
                id: project.slug,
                name: project.title,
                type: 'project',
                val: 20,
                color: '#10b981' // Green 500
            });

            // Projects link to skills used
            project.techStack.forEach(tech => {
                const skillNode = nodes.find(n => n.id.toLowerCase() === tech.toLowerCase());
                if (skillNode) {
                    links.push({ source: skillNode.id, target: project.slug });
                }
            });
        });

        // 5. Article Nodes
        (siteData.articles || []).forEach(article => {
            nodes.push({
                id: article.link,
                name: article.title,
                type: 'article',
                val: 10,
                color: '#34d399' // Green 400
            });

            // Articles link to categories they belong to
            article.tags.forEach(tag => {
                const catNode = nodes.find(n => n.type === 'category' && n.name.toLowerCase().includes(tag.toLowerCase()));
                if (catNode) {
                    links.push({ source: catNode.id, target: article.link });
                }
            });
        });

        return { nodes, links };
    }, []);

    const handleNodeClick = (node: any) => {
        const graphNode = node as GraphNode;
        setSelectedNode(graphNode);
        if (fgRef.current && graphNode.x !== undefined && graphNode.y !== undefined) {
            fgRef.current.centerAt(graphNode.x, graphNode.y, 1000);
            fgRef.current.zoom(3, 1000);
        }
    };

    return (
        <Section className="py-24 overflow-hidden bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Ecosystem Map</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Explore how my skills, experiences, and projects connect in a digital constellation.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    {[
                        { label: 'Core Identity', color: '#2563eb' },
                        { label: 'Work Experience', color: '#8b5cf6' },
                        { label: 'Tech Stack', color: '#3b82f6' },
                        { label: 'Skills', color: '#93c5fd' },
                        { label: 'Projects', color: '#10b981' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-[1fr_350px] gap-8 h-[700px]">
                    <GlassCard className="p-0 border-gray-100 overflow-hidden shadow-2xl bg-white relative">
                        <div className="absolute top-4 left-4 z-10 space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interactive Canvas</p>
                            <p className="text-xs text-gray-500">Scroll to zoom • Drag to rotate • Click nodes</p>
                        </div>
                        <ForceGraph2D
                            ref={fgRef}
                            graphData={graphData}
                            nodeLabel="name"
                            nodeRelSize={6}
                            nodeVal={d => (d as GraphNode).val}
                            nodeColor={d => (d as GraphNode).color}
                            linkDirectionalParticles={1}
                            linkDirectionalParticleSpeed={0.005}
                            linkColor={() => '#f1f5f9'}
                            linkWidth={1.5}
                            onNodeClick={handleNodeClick}
                            onNodeHover={(node) => setHoverNode(node ? (node as GraphNode).id : null)}
                            backgroundColor="#ffffff"
                            width={window.innerWidth < 1024 ? window.innerWidth - 80 : 850}
                            height={700}
                            nodeCanvasObject={(node: any, ctx, globalScale) => {
                                const label = node.name;
                                const fontSize = 12 / globalScale;
                                ctx.font = `${node.id === 'me' ? 'bold' : 'normal'} ${fontSize}px Inter, sans-serif`;
                                const textWidth = ctx.measureText(label).width;
                                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                                // Node Circle
                                ctx.beginPath();
                                ctx.arc(node.x, node.y, (node.val / 3) + 2, 0, 2 * Math.PI, false);
                                ctx.fillStyle = node.color;
                                ctx.fill();

                                // Stroke for hover
                                if (hoverNode === node.id || selectedNode?.id === node.id) {
                                    ctx.strokeStyle = '#000';
                                    ctx.lineWidth = 1 / globalScale;
                                    ctx.stroke();
                                }

                                // Text Label (only show if zoom is enough or it's a major node)
                                if (globalScale > 1.5 || node.val > 15) {
                                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + (node.val / 3) + 4, bckgDimensions[0], bckgDimensions[1]);

                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillStyle = '#1e293b';
                                    ctx.fillText(label, node.x, node.y + (node.val / 3) + 4 + (fontSize / 2));
                                }
                            }}
                            cooldownTicks={100}
                            d3AlphaDecay={0.02}
                            d3VelocityDecay={0.4}
                        />
                    </GlassCard>

                    <GlassCard className="p-8 border-gray-100 shadow-xl bg-white flex flex-col">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-2 h-6 bg-primary rounded-full" />
                                Connection Insights
                            </h3>

                            {selectedNode ? (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                                    <div>
                                        <Badge className={`mb-3 py-1 px-3 text-[10px] tracking-widest ${selectedNode.type === 'root' ? 'bg-blue-600 text-white' :
                                                selectedNode.type === 'experience' ? 'bg-purple-100 text-purple-700' :
                                                    selectedNode.type === 'project' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-slate-100 text-slate-700'
                                            }`}>
                                            {selectedNode.type.toUpperCase()}
                                        </Badge>
                                        <h4 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{selectedNode.name}</h4>
                                    </div>

                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-sm text-slate-600 leading-relaxed italic">
                                            {selectedNode.type === 'root' ? "This is the core of the ecosystem: Nevin's professional identity and vision." :
                                                selectedNode.type === 'category' ? `Central focus area: ${selectedNode.name}. Braching into specialized technical skills.` :
                                                    selectedNode.type === 'experience' ? `A cornerstone of his career path at ${selectedNode.name}.` :
                                                        selectedNode.type === 'project' ? `A practical implementation demonstrating his technical depth.` :
                                                            selectedNode.type === 'article' ? `Research and insights published to share knowledge.` :
                                                                'A technical competency used to build modern systems.'}
                                        </p>
                                    </div>

                                    {selectedNode.type === 'article' && (
                                        <a
                                            href={selectedNode.id}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                                        >
                                            Explore Article <ChevronRight className="w-4 h-4" />
                                        </a>
                                    )}
                                    {selectedNode.type === 'project' && (
                                        <div className="pt-4 space-y-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Linked Capabilities</p>
                                            <div className="flex flex-wrap gap-2">
                                                {siteData.projects.find(p => p.slug === selectedNode.id)?.techStack.map(s => (
                                                    <span key={s} className="text-[10px] font-medium px-2 py-1 bg-white border border-slate-200 rounded-md">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-slate-400 text-center py-20 flex flex-col items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full border-4 border-slate-100" />
                                        <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-primary animate-spin" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-bold text-slate-600">Map Inactive</p>
                                        <p className="text-sm">Select a node in the constellation to reveal its role in the ecosystem.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-xs text-slate-400 italic">
                                The proximity of nodes represents thematic alignment rather than strict hierarchy.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </Section>
    );
};

export default KnowledgeCanvas;
