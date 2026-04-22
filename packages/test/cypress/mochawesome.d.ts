declare module 'mochawesome-merge' {
  export function merge(options: any): Promise<any>;
}

declare module 'mochawesome-report-generator' {
  
  export interface GeneratorOptions {
    /** Filename of saved report. Default: 'mochawesome' */
    reportFilename?: string;
    
    /** Path to save report. Default: '[cwd]/mochawesome-report' */
    reportDir?: string;
    
    /** Report title. Default: 'mochawesome' */
    reportTitle?: string;
    
    /** Browser title. Default: 'mochawesome-report' */
    reportPageTitle?: string;
    
    /** Inline report assets (scripts, styles). Default: false */
    inline?: boolean;
    
    /** Load report assets via CDN (unpkg.com). Default: false */
    cdn?: boolean;
    
    /** Path to save report assets (js/css). Default: '[cwd]/mochawesome-report/assets' */
    assetsDir?: string;
    
    /** Display Suite charts. Default: false */
    charts?: boolean;
    
    /** Display test code. Default: true */
    code?: boolean;
    
    /** Automatically open the report. Default: false */
    autoOpen?: boolean;
    
    /** Overwrite existing report files. Default: true */
    overwrite?: boolean;
    
    /** Append timestamp in specified format to report filename. */
    timestamp?: string | boolean;
    
    /** Set initial state of "Show Passed" filter. Default: true */
    showPassed?: boolean;
    
    /** Set initial state of "Show Failed" filter. Default: true */
    showFailed?: boolean;
    
    /** Set initial state of "Show Pending" filter. Default: true */
    showPending?: boolean;
    
    /** Set initial state of "Show Skipped" filter. Default: false */
    showSkipped?: boolean;
    
    /** * Set the default display mode for hooks. 
     * 'failed': show only failed hooks
     * 'always': show all hooks
     * 'never': hide all hooks
     * 'context': show only hooks that have context
     * Default: 'failed' 
     */
    showHooks?: 'failed' | 'always' | 'never' | 'context';
    
    /** Should report data be saved to JSON file. Default: false */
    saveJson?: boolean;
    
    /** Should report be saved to HTML file. Default: true */
    saveHtml?: boolean;
    
    /** Enable dev mode (requires local webpack dev server). Default: false */
    dev?: boolean;
    
    /** Allows for any additional custom options */
    [key: string]: any;
  }

  export function create(report: any, options?: GeneratorOptions): Promise<any>;
}