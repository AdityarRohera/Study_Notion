
export default function Code() {
  return (
    <div className="flex-1 bg-[#161b22] rounded-lg p-6 font-mono text-base overflow-x-auto min-h-[300px]">
      <pre className="text-pink-400">{`<!DOCTYPE html>`}</pre>
      <pre>{`<html>`}</pre>
      <pre>{`<head><title>Example</title>`}</pre>
      <pre>{`<link rel="stylesheet" href="styles.css">`}</pre>
      <pre>{`</head>`}</pre>
      <pre>{`<body>`}</pre>
      <pre>{`<h1><a href="/">Header</a></h1>`}</pre>
      <pre>{`</body>`}</pre>
      <pre>{`</html>`}</pre>
    </div>
  );
}
