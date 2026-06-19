/* ------------------------------------------------------------------ */
/*  Article content data — drives every /article/:slug page            */
/* ------------------------------------------------------------------ */

export interface FormulaSection {
  type: 'formula'
  math: string
  label?: string
}

export interface TextSection {
  type: 'text'
  html: string // supports <strong>, <em>, <InfoTooltip />
}

export interface ChartSection {
  type: 'chart'
  chart: 'beeswarm' | 'bar' | 'line' | 'roc' | 'scatter' | 'area' | 'sigmoid' | 'tree' | 'forest' | 'heatmap' | 'architecture'
  title: string
  description: string
  interactive?: boolean
}

export interface TabSection {
  type: 'tabs'
  tabs: { label: string; content: ContentBlock[] }[]
}

export interface DefinitionBox {
  type: 'definition'
  title: string
  math: string
  note?: string
}

export interface InfoBox {
  type: 'info'
  variant: 'accent' | 'emerald' | 'amber'
  text: string
}

export type ContentBlock =
  | TextSection
  | FormulaSection
  | ChartSection
  | TabSection
  | DefinitionBox
  | InfoBox

export interface ArticleChapter {
  slug: string
  title: string
  subtitle: string
  authors: string
  date: string
  thumbnail: string
  sections: { heading: string; blocks: ContentBlock[] }[]
  conclusion: string
  references: { title: string; authors: string; url: string }[]
}

/* ================================================================== */
/*  CHAPTERS                                                           */
/* ================================================================== */

const BASE = 'https://mlu-explain.github.io/assets/thumbnails'

export const chapters: ArticleChapter[] = [
  /* ---- 1. Neural Networks ---- */
  {
    slug: 'neural-networks',
    title: 'Neural Networks',
    subtitle: 'The Building Blocks of Deep Learning',
    authors: 'Jared Wilber',
    date: 'March 2024',
    thumbnail: `${BASE}/thumbnail-neural-networks.jpg`,
    sections: [
      {
        heading: 'What is a Neural Network?',
        blocks: [
          { type: 'text', html: 'Neural networks are computational models inspired by the biological neural networks in the human brain. They consist of layers of interconnected nodes (<strong>neurons</strong>) that process information using connectionist approaches to computation.' },
          { type: 'text', html: 'Each connection (synapse) between neurons has a <strong>weight</strong> that is adjusted during learning. A neuron computes a weighted sum of its inputs, adds a bias, and passes the result through an <strong>activation function</strong>.' },
          { type: 'formula', math: 'a = \\sigma\\!\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)', label: 'Neuron output' },
          { type: 'definition', title: 'Activation Function', math: '\\sigma(z) = \\frac{1}{1 + e^{-z}}', note: 'The sigmoid function maps any input to a value between 0 and 1, introducing non-linearity.' },
        ],
      },
      {
        heading: 'Network Architecture',
        blocks: [
          { type: 'text', html: 'A typical neural network consists of an <strong>input layer</strong>, one or more <strong>hidden layers</strong>, and an <strong>output layer</strong>. The depth (number of hidden layers) gives rise to the term "deep learning".' },
          { type: 'chart', chart: 'area', title: 'Layer Activations During Forward Pass', description: 'Visualizing how activations flow through the network layers', interactive: true },
          { type: 'text', html: 'The network learns by adjusting weights to minimize a <strong>loss function</strong>. This process is called <strong>backpropagation</strong>, which uses the chain rule of calculus to compute gradients.' },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial a_j} \\cdot \\frac{\\partial a_j}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}', label: 'Backpropagation chain rule' },
        ],
      },
      {
        heading: 'Training with Gradient Descent',
        blocks: [
          { type: 'text', html: 'Gradient descent is the optimization algorithm used to update weights. It iteratively moves toward the minimum of the loss function.' },
          { type: 'chart', chart: 'scatter', title: 'Loss Landscape & Optimization Path', description: 'Watch gradient descent navigate the loss surface', interactive: true },
          { type: 'formula', math: 'w_{t+1} = w_t - \\eta \\nabla L(w_t)', label: 'Weight update rule' },
          { type: 'info', variant: 'accent', text: 'Choosing the right learning rate η is crucial — too large causes divergence, too small causes slow convergence.' },
          { type: 'text', html: '<strong>Adam optimizer</strong> combines the benefits of momentum and RMSProp, maintaining per-parameter adaptive learning rates. It is the default optimizer for most deep learning tasks.' },
          { type: 'formula', math: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2', label: 'Adam: momentum + adaptive LR' },
        ],
      },
    ],
    conclusion: 'Neural networks are the backbone of modern AI. From ChatGPT to Stable Diffusion, understanding their architecture and training process is essential for anyone working in machine learning today.',
    references: [
      { title: 'Deep Learning', authors: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', url: 'https://www.deeplearningbook.org/' },
      { title: 'Neural Networks and Deep Learning', authors: 'Michael Nielsen', url: 'http://neuralnetworksanddeeplearning.com/' },
    ],
  },

  /* ---- 2. Equality of Odds ---- */
  {
    slug: 'equality-of-odds',
    title: 'Equality Of Odds',
    subtitle: 'A Visual Introduction to Measuring and Mitigating Bias in Machine Learning',
    authors: 'Mia Mayer & Jared Wilber',
    date: 'April 2023',
    thumbnail: `${BASE}/thumbnail-equality-of-odds.jpg`,
    sections: [
      {
        heading: 'Defining Equalized Odds',
        blocks: [
          { type: 'text', html: 'The <em>Equalized Odds</em> (EO) fairness criterion aims to equalize the errors a model makes for different groups. EO considers the ground truth distribution of labels.' },
          { type: 'text', html: 'In a hiring scenario, a model could make a <strong>wrong rejection</strong> (rejecting a qualified candidate) or a <strong>wrong acceptance</strong> (accepting an unqualified candidate).' },
          { type: 'formula', math: 'P(\\hat{Y}=1 \\mid Y=y,\\; A=\\blacksquare) = P(\\hat{Y}=1 \\mid Y=y,\\; A=\\square), \\quad y \\in \\{0,1\\}', label: 'EO Definition' },
          { type: 'definition', title: 'False Positive Rate Balance', math: '\\text{FPR}_{\\blacksquare} - \\text{FPR}_{\\square}', note: 'Range [-1, 1]. Closer to 0 means more fair.' },
        ],
      },
      {
        heading: 'Measuring Fairness',
        blocks: [
          { type: 'text', html: 'We compare error rates across groups. The key metrics are <strong>FPR</strong> (false positive rate) and <strong>FNR</strong> (false negative rate).' },
          { type: 'chart', chart: 'beeswarm', title: 'Interactive: Beeswarm Predictions', description: 'Drag the threshold to change the probability cutoff', interactive: true },
          { type: 'chart', chart: 'bar', title: 'Outcomes by Group', description: 'Count of TP, TN, FP, FN per group' },
          { type: 'chart', chart: 'line', title: 'FPR/FNR by Threshold', description: 'Comparing error rates across all thresholds' },
        ],
      },
      {
        heading: 'Achieving Fairness',
        blocks: [
          { type: 'text', html: 'We can achieve EO through <strong>constrained optimization during training</strong> or via <strong>post-processing</strong>.' },
          { type: 'formula', math: '\\min_\\theta L(\\theta) \\quad \\text{s.t.} \\quad |P(\\hat{Y}\\neq Y, A{=}\\blacksquare) - P(\\hat{Y}\\neq Y, A{=}\\square)| \\leq \\varepsilon', label: 'Constrained optimization' },
          { type: 'chart', chart: 'roc', title: 'ROC Curves per Group', description: 'Where TPR and FPR match, EO is satisfied', interactive: true },
          { type: 'info', variant: 'emerald', text: 'When TPR and FPR match for both groups (neither are 0), Equalized Odds is satisfied.' },
        ],
      },
    ],
    conclusion: 'Equality of Odds offers a principled approach to measuring and mitigating bias. Before using EO, carefully consider the context and potential trade-offs between competing objectives.',
    references: [
      { title: 'Fairness and Machine Learning', authors: 'Barocas, Hardt, Narayanan', url: 'https://fairmlbook.org/' },
      { title: 'Equality of Opportunity in Supervised Learning', authors: 'Hardt, Price, Srebro, 2016', url: 'https://arxiv.org/abs/1610.02413' },
    ],
  },

  /* ---- 3. Logistic Regression ---- */
  {
    slug: 'logistic-regression',
    title: 'Logistic Regression',
    subtitle: 'Binary Classification Through the Sigmoid Function',
    authors: 'Jared Wilber',
    date: 'February 2024',
    thumbnail: `${BASE}/thumbnail-logistic-regression.jpg`,
    sections: [
      {
        heading: 'The Sigmoid Function',
        blocks: [
          { type: 'text', html: 'Logistic regression models the probability that an input belongs to a particular class using the <strong>sigmoid (logistic) function</strong>.' },
          { type: 'formula', math: 'P(y=1 \\mid x) = \\frac{1}{1 + e^{-(w^Tx + b)}}', label: 'Sigmoid output' },
          { type: 'chart', chart: 'sigmoid', title: 'Sigmoid Curve & Decision Boundary', description: 'The S-shaped curve maps any input to a probability between 0 and 1', interactive: true },
          { type: 'text', html: 'The model learns the optimal weights <strong>w</strong> and bias <strong>b</strong> to separate classes.' },
        ],
      },
      {
        heading: 'Log-Loss and Maximum Likelihood',
        blocks: [
          { type: 'text', html: 'Unlike linear regression, logistic regression uses <strong>log-loss</strong> (cross-entropy) as its cost function, derived from maximum likelihood estimation.' },
          { type: 'formula', math: 'L(\\theta) = -\\frac{1}{m}\\sum_{i=1}^{m}[y_i\\log(h_\\theta(x_i)) + (1-y_i)\\log(1-h_\\theta(x_i))]', label: 'Cross-entropy loss' },
          { type: 'chart', chart: 'area', title: 'Loss Surface During Training', description: 'How the loss decreases as the model learns', interactive: true },
          { type: 'text', html: 'The <strong>decision boundary</strong> of logistic regression is a linear hyperplane in the feature space. For non-linear boundaries, you must add polynomial features or use kernel methods.' },
        ],
      },
      {
        heading: 'Regularization and Multiclass',
        blocks: [
          { type: 'text', html: 'To prevent overfitting, logistic regression commonly uses <strong>L2 regularization</strong> (C parameter in scikit-learn). For multiclass problems, <strong>One-vs-Rest</strong> or <strong>Softmax (multinomial)</strong> logistic regression extends the binary model.' },
          { type: 'formula', math: 'L_{reg}(\\theta) = L(\\theta) + \\frac{\\lambda}{2m}\\|\\theta\\|^2', label: 'Regularized logistic regression' },
          { type: 'formula', math: 'P(y=k|x) = \\frac{e^{w_k^Tx + b_k}}{\\sum_{j=1}^{K} e^{w_j^Tx + b_j}}', label: 'Softmax (multiclass)' },
          { type: 'info', variant: 'emerald', text: 'Logistic regression is often the best first model to try on a classification problem. Its coefficients are directly interpretable as log-odds ratios.' },
        ],
      },
    ],
    conclusion: 'Logistic regression remains one of the most widely used classification algorithms. Its simplicity, interpretability, and probabilistic output make it an excellent baseline model.',
    references: [
      { title: 'Pattern Recognition and Machine Learning', authors: 'Christopher Bishop', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/' },
    ],
  },

  /* ---- 4. Linear Regression ---- */
  {
    slug: 'linear-regression',
    title: 'Linear Regression',
    subtitle: 'Fitting Lines to Data with Least Squares',
    authors: 'Jared Wilber',
    date: 'January 2024',
    thumbnail: `${BASE}/thumbnail-linear-regression.jpg`,
    sections: [
      {
        heading: 'The Linear Model',
        blocks: [
          { type: 'text', html: 'Linear regression models the relationship between a dependent variable and one or more independent variables using a <strong>linear equation</strong>.' },
          { type: 'formula', math: '\\hat{y} = w_1x_1 + w_2x_2 + \\ldots + w_nx_n + b', label: 'Linear prediction' },
          { type: 'chart', chart: 'scatter', title: 'Best-Fit Line with Confidence Intervals', description: 'The regression line minimizes the sum of squared residuals', interactive: true },
        ],
      },
      {
        heading: 'Ordinary Least Squares',
        blocks: [
          { type: 'text', html: 'The <strong>OLS method</strong> finds the parameters that minimize the sum of squared differences between observed and predicted values.' },
          { type: 'formula', math: '\\hat{w} = (X^TX)^{-1}X^Ty', label: 'OLS closed-form solution' },
          { type: 'definition', title: 'R-squared', math: 'R^2 = 1 - \\frac{\\sum(y_i - \\hat{y}_i)^2}{\\sum(y_i - \\bar{y})^2}', note: 'Measures the proportion of variance explained by the model. Range: [0, 1].' },
          { type: 'text', html: 'OLS assumes: <strong>linearity</strong>, <strong>independence</strong> of errors, <strong>homoscedasticity</strong> (constant variance), and <strong>no multicollinearity</strong>. Violations of these assumptions require alternative methods like Ridge/Lasso regression.' },
          { type: 'info', variant: 'emerald', text: 'Regularized variants: <strong>Ridge</strong> (L2) shrinks coefficients toward zero. <strong>Lasso</strong> (L1) performs feature selection by driving some coefficients exactly to zero. <strong>Elastic Net</strong> combines both.' },
        ],
      },
    ],
    conclusion: 'Linear regression is the foundation upon which many advanced ML techniques are built. Understanding its assumptions and limitations is key to proper application.',
    references: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie, Tibshirani', url: 'https://www.statlearning.com/' },
    ],
  },

  /* ---- 5. Reinforcement Learning ---- */
  {
    slug: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    subtitle: 'Learning Through Trial and Error in Interactive Environments',
    authors: 'Jared Wilber',
    date: 'May 2023',
    thumbnail: `${BASE}/thumbnail-reinforcement-learning.jpg`,
    sections: [
      {
        heading: 'The RL Framework',
        blocks: [
          { type: 'text', html: 'In reinforcement learning, an <strong>agent</strong> learns to make decisions by interacting with an <strong>environment</strong>. The agent receives <strong>rewards</strong> or <strong>penalties</strong> based on its actions.' },
          { type: 'formula', math: 'G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}', label: 'Discounted return' },
          { type: 'text', html: 'The <strong>exploration-exploitation dilemma</strong> is central to RL: should the agent exploit known good actions or explore potentially better ones?' },
          { type: 'chart', chart: 'area', title: 'Grid World: Agent Learning Path', description: 'Watch the agent learn optimal policies through interaction', interactive: true },
        ],
      },
      {
        heading: 'Q-Learning',
        blocks: [
          { type: 'text', html: 'Q-learning is a model-free algorithm that learns the value of taking an action in a given state.' },
          { type: 'formula', math: 'Q(s,a) \\leftarrow Q(s,a) + \\alpha[r + \\gamma \\max_{a\'} Q(s\',a\') - Q(s,a)]', label: 'Q-learning update rule' },
          { type: 'chart', chart: 'line', title: 'Q-Value Convergence Over Episodes', description: 'How Q-values stabilize as the agent learns', interactive: true },
          { type: 'text', html: 'Modern RL often uses <strong>Deep Q-Networks (DQN)</strong>, where a neural network approximates the Q-function. Experience replay and target networks stabilize training.' },
          { type: 'info', variant: 'emerald', text: 'Policy gradient methods (REINFORCE, PPO, A3C) directly optimize the policy without learning a value function, making them suitable for continuous action spaces.' },
        ],
      },
    ],
    conclusion: 'Reinforcement learning powers some of AI\'s most impressive achievements, from game-playing to robotics. Understanding the exploration-exploitation tradeoff is key to building effective RL agents.',
    references: [
      { title: 'Reinforcement Learning: An Introduction', authors: 'Richard Sutton & Andrew Barto', url: 'http://incompleteideas.net/book/the-book-2nd.html' },
    ],
  },

  /* ---- 6. ROC & AUC ---- */
  {
    slug: 'roc-auc',
    title: 'ROC & AUC',
    subtitle: 'Visualizing Classifier Performance Across All Thresholds',
    authors: 'Jared Wilber',
    date: 'June 2023',
    thumbnail: `${BASE}/thumbnail-roc-auc.jpg`,
    sections: [
      {
        heading: 'The ROC Curve',
        blocks: [
          { type: 'text', html: 'The <strong>Receiver Operating Characteristic</strong> (ROC) curve plots the True Positive Rate against the False Positive Rate at various classification thresholds.' },
          { type: 'chart', chart: 'roc', title: 'Comparing ROC Curves', description: 'Perfect vs. Our vs. Random classifier', interactive: true },
          { type: 'definition', title: 'Area Under the Curve (AUC)', math: '\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR})\\, d(\\text{FPR})', note: 'AUC = 1 means perfect classification. AUC = 0.5 means random guessing.' },
        ],
      },
      {
        heading: 'Interpreting AUC',
        blocks: [
          { type: 'text', html: 'AUC represents the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example.' },
          { type: 'chart', chart: 'area', title: 'AUC Under Varying Class Distributions', description: 'How class imbalance affects the ROC curve', interactive: true },
          { type: 'text', html: 'An AUC of <strong>0.9+</strong> is excellent, <strong>0.8-0.9</strong> is good, <strong>0.7-0.8</strong> is fair, and <strong>0.5</strong> is no better than random guessing. However, AUC alone can be misleading for imbalanced datasets — consider PR curves instead.' },
          { type: 'info', variant: 'emerald', text: 'When comparing two classifiers, prefer the one with higher AUC. But remember: AUC measures ranking quality, not calibration. A model can have perfect AUC but poorly calibrated probabilities.' },
        ],
      },
    ],
    conclusion: 'The ROC curve and AUC provide a threshold-independent way to evaluate classifiers, making them invaluable for comparing models across different operating points.',
    references: [
      { title: 'An Introduction to ROC Analysis', authors: 'Tom Fawcett, 2006', url: 'https://doi.org/10.1016/j.patrec.2005.10.010' },
    ],
  },

  /* ---- 7. Cross-Validation ---- */
  {
    slug: 'cross-validation',
    title: 'Cross-Validation',
    subtitle: 'K-Fold Resampling for Robust Model Evaluation',
    authors: 'Jared Wilber',
    date: 'July 2023',
    thumbnail: `${BASE}/thumbnail-cross-validation.jpg`,
    sections: [
      {
        heading: 'Why Cross-Validation?',
        blocks: [
          { type: 'text', html: 'A single train/test split can give a misleading estimate of model performance. <strong>K-Fold Cross-Validation</strong> provides a more robust evaluation by averaging over multiple splits.' },
          { type: 'chart', chart: 'bar', title: 'K-Fold Split Visualization', description: 'How data is partitioned across K folds', interactive: true },
          { type: 'formula', math: '\\hat{E}_{CV} = \\frac{1}{K}\\sum_{k=1}^{K} E_k', label: 'CV error estimate' },
          { type: 'text', html: 'The idea is simple: divide your data into K equal parts. Train on K-1 folds and test on the remaining fold. Repeat K times, each time holding out a different fold. The final metric is the average across all K runs.' },
        ],
      },
      {
        heading: 'Variants of Cross-Validation',
        blocks: [
          { type: 'text', html: '<strong>Stratified K-Fold</strong> preserves the class distribution in each fold — essential for imbalanced datasets. <strong>Leave-One-Out (LOO)</strong> uses K = N, giving an almost unbiased estimate but at high computational cost.' },
          { type: 'formula', math: '\\text{LOO}: \\hat{E} = \\frac{1}{N}\\sum_{i=1}^{N} L(y_i, \\hat{f}_{-i}(x_i))', label: 'Leave-One-Out error' },
          { type: 'text', html: 'For <strong>time-series data</strong>, standard K-Fold is invalid due to temporal leakage. Use <strong>expanding window</strong> or <strong>rolling window</strong> CV instead, where the test set always comes after the training set in time.' },
          { type: 'info', variant: 'accent', text: 'K=5 or K=10 are standard choices. K=5 gives slightly higher bias but lower variance in the error estimate; K=10 is more computationally expensive but often more accurate.' },
          { type: 'definition', title: 'Repeated K-Fold', math: '\\text{Repeat K-Fold } R \text{ times with different random splits}', note: 'Reduces variance in the CV estimate. Common: 5-fold × 5 repeats = 25 total fits.' },
        ],
      },
    ],
    conclusion: 'Cross-validation is essential for model selection and hyperparameter tuning, providing a more reliable estimate of how your model will generalize to unseen data.',
    references: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie, Tibshirani', url: 'https://www.statlearning.com/' },
    ],
  },

  /* ---- 8. Train, Test, Validation ---- */
  {
    slug: 'train-test-validation',
    title: 'Train, Test, and Validation Sets',
    subtitle: 'Why Data Splitting Matters for Model Evaluation',
    authors: 'Jared Wilber',
    date: 'August 2023',
    thumbnail: `${BASE}/thumbnail-train-test-validation.jpg`,
    sections: [
      {
        heading: 'The Three Splits',
        blocks: [
          { type: 'text', html: 'Proper data splitting is crucial: the <strong>training set</strong> teaches the model, the <strong>validation set</strong> tunes hyperparameters, and the <strong>test set</strong> provides an unbiased performance estimate.' },
          { type: 'chart', chart: 'bar', title: 'Performance Across Data Splits', description: 'How models perform on train vs. validation vs. test data', interactive: true },
          { type: 'info', variant: 'accent', text: 'Never tune hyperparameters on the test set — this leads to overly optimistic performance estimates and poor generalization.' },
          { type: 'text', html: 'A common starting point is a <strong>60/20/20</strong> or <strong>70/15/15</strong> split. With very large datasets (>1M samples), even a 98/1/1 split can provide enough data for validation and testing.' },
        ],
      },
      {
        heading: 'Data Leakage & Common Pitfalls',
        blocks: [
          { type: 'text', html: '<strong>Data leakage</strong> occurs when information from the test/validation set inadvertently influences training. Common sources include: preprocessing on the entire dataset before splitting, duplicate samples across splits, and temporal leakage in time-series data.' },
          { type: 'definition', title: 'Correct Preprocessing Order', math: '\\text{1. Split} \\to \\text{2. Fit scaler on train} \\to \\text{3. Transform all}', note: 'Always fit preprocessing (scalers, imputers, encoders) on the training set only, then transform validation/test.' },
          { type: 'chart', chart: 'area', title: 'Learning Curves: Train vs. Validation Error', description: 'Diagnose underfitting and overfitting from learning curves', interactive: true },
          { type: 'info', variant: 'amber', text: 'For time-series data, use temporal splitting (train on past, test on future) rather than random shuffling. Random splits can leak future information into the training set.' },
        ],
      },
    ],
    conclusion: 'The train/validation/test split is the foundation of rigorous ML evaluation. Each set serves a distinct purpose in the model development pipeline.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
    ],
  },

  /* ---- 9. Precision & Recall ---- */
  {
    slug: 'precision-recall',
    title: 'Precision & Recall',
    subtitle: 'Beyond Accuracy: Evaluating Classification Models',
    authors: 'Jared Wilber',
    date: 'September 2023',
    thumbnail: `${BASE}/thumbnail-precision-recall.jpg`,
    sections: [
      {
        heading: 'The Confusion Matrix',
        blocks: [
          { type: 'text', html: 'The <strong>confusion matrix</strong> summarizes the performance of a classification model by counting true positives, true negatives, false positives, and false negatives.' },
          { type: 'formula', math: '\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}', label: 'Precision & Recall' },
          { type: 'definition', title: 'F1 Score', math: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}', note: 'The harmonic mean of precision and recall. Balances both concerns.' },
          { type: 'chart', chart: 'bar', title: 'Precision-Recall Trade-off', description: 'How changing the threshold affects precision and recall', interactive: true },
          { type: 'text', html: 'High precision means few false positives (important for spam detection). High recall means few false negatives (critical for disease diagnosis). The <strong>F1 score</strong> balances both concerns as their harmonic mean.' },
        ],
      },
      {
        heading: 'Precision-Recall Curves',
        blocks: [
          { type: 'text', html: 'The <strong>PR curve</strong> plots Precision vs. Recall at all thresholds. Unlike ROC, PR curves are sensitive to class imbalance, making them more informative for imbalanced datasets.' },
          { type: 'chart', chart: 'roc', title: 'Precision-Recall Curve Comparison', description: 'Comparing PR curves for balanced vs. imbalanced datasets', interactive: true },
          { type: 'definition', title: 'Average Precision (AP)', math: 'AP = \\sum_n (R_n - R_{n-1}) P_n', note: 'The area under the PR curve. A single-number summary of classifier quality across all thresholds.' },
          { type: 'info', variant: 'emerald', text: 'When classes are heavily imbalanced (e.g., 1% positive), prefer PR curves over ROC curves. A high AUC-ROC can mask poor precision on the minority class.' },
        ],
      },
    ],
    conclusion: 'When accuracy is misleading (e.g., imbalanced datasets), precision and recall provide a much clearer picture of model performance.',
    references: [
      { title: 'The Relationship Between Precision-Recall and ROC Curves', authors: 'Davis & Goadrich, 2006', url: 'https://doi.org/10.1145/1143844.1143874' },
    ],
  },

  /* ---- 10. Random Forest ---- */
  {
    slug: 'random-forest',
    title: 'Random Forest',
    subtitle: 'The Power of Ensemble Learning',
    authors: 'Jared Wilber',
    date: 'October 2023',
    thumbnail: `${BASE}/thumbnail-random-forest.jpg`,
    sections: [
      {
        heading: 'Ensemble of Decision Trees',
        blocks: [
          { type: 'text', html: 'A <strong>Random Forest</strong> builds many decision trees on random subsets of the data and combines their predictions through <strong>majority voting</strong> (classification) or <strong>averaging</strong> (regression).' },
          { type: 'chart', chart: 'forest', title: 'Forest of Trees Voting', description: 'How multiple trees combine for a robust prediction', interactive: true },
          { type: 'formula', math: '\\hat{y} = \\frac{1}{B}\\sum_{b=1}^{B} T_b(x)', label: 'Forest prediction (regression)' },
          { type: 'text', html: 'The randomness introduced by <strong>bagging</strong> (bootstrap aggregating) and <strong>feature subsetting</strong> reduces overfitting compared to individual trees.' },
          { type: 'text', html: 'Random Forest also provides built-in <strong>feature importance</strong> scores, measuring how much each feature reduces impurity across all trees. This is invaluable for feature selection and model interpretability.' },
          { type: 'definition', title: 'Out-of-Bag (OOB) Error', math: '\\hat{E}_{OOB} = \\frac{1}{N}\\sum_{i=1}^{N} L(y_i, \\hat{f}_{-i}(x_i))', note: 'Each sample is held out from ~37% of trees. OOB error is a free cross-validation estimate — no separate validation set needed.' },
        ],
      },
      {
        heading: 'Hyperparameter Tuning',
        blocks: [
          { type: 'text', html: 'Key hyperparameters include: <strong>number of trees</strong> (more = better, diminishing returns), <strong>max depth</strong> (controls overfitting), <strong>min samples per leaf</strong> (regularization), and <strong>max features per split</strong> (diversity).' },
          { type: 'chart', chart: 'area', title: 'Performance vs. Number of Trees', description: 'How accuracy improves as more trees are added', interactive: true },
          { type: 'info', variant: 'emerald', text: 'Random Forest rarely overfits with more trees. Start with 100-500 trees and increase if needed. The main cost is memory and inference time, not overfitting.' },
          { type: 'formula', math: '\\text{Importance}(j) = \\frac{1}{B}\\sum_{b=1}^{B} \\sum_{t \\in T_b: v(t)=j} \\Delta I(t)', label: 'Feature importance (mean decrease in impurity)' },
        ],
      },
    ],
    conclusion: 'Random Forest is one of the most widely-used and robust ML algorithms. Its ability to handle high-dimensional data with minimal tuning makes it a go-to choice for many practitioners.',
    references: [
      { title: 'Random Forests', authors: 'Leo Breiman, 2001', url: 'https://doi.org/10.1023/A:1010933404324' },
    ],
  },

  /* ---- 11. Decision Trees ---- */
  {
    slug: 'decision-trees',
    title: 'Decision Trees',
    subtitle: 'Splitting Data with Entropy and Information Gain',
    authors: 'Jared Wilber',
    date: 'November 2023',
    thumbnail: `${BASE}/thumbnail-decision-tree.jpg`,
    sections: [
      {
        heading: 'How Trees Split Data',
        blocks: [
          { type: 'text', html: 'Decision trees recursively partition the feature space by choosing the split that maximizes <strong>information gain</strong> — the reduction in uncertainty.' },
          { type: 'formula', math: 'H(S) = -\\sum_{i=1}^{c} p_i \\log_2 p_i', label: 'Entropy' },
          { type: 'formula', math: 'IG(S, A) = H(S) - \\sum_{v \\in A} \\frac{|S_v|}{|S|} H(S_v)', label: 'Information Gain' },
          { type: 'chart', chart: 'tree', title: 'Interactive Decision Tree', description: 'Watch the tree grow and split the data', interactive: true },
          { type: 'info', variant: 'amber', text: 'Going too deep leads to overfitting. Pruning and max-depth constraints are essential regularization techniques.' },
          { type: 'text', html: 'Decision trees can use either <strong>entropy</strong> or <strong>Gini impurity</strong> as the splitting criterion. In practice, they produce similar trees — Gini is faster to compute.' },
          { type: 'formula', math: '\\text{Gini}(S) = 1 - \\sum_{i=1}^{c} p_i^2', label: 'Gini Impurity' },
        ],
      },
      {
        heading: 'Pruning and Regularization',
        blocks: [
          { type: 'text', html: 'Unconstrained trees will memorize the training data perfectly. <strong>Pre-pruning</strong> stops growth early (max depth, min samples per split). <strong>Post-pruning</strong> (cost-complexity pruning) grows the full tree then removes branches that don\'t improve validation performance.' },
          { type: 'formula', math: 'C_\\alpha(T) = \\sum_{m=1}^{|T|} N_m Q_m(T) + \\alpha |T|', label: 'Cost-complexity pruning (CART)' },
          { type: 'chart', chart: 'line', title: 'Tree Depth vs. Train/Test Accuracy', description: 'The overfitting effect of increasing tree depth', interactive: true },
          { type: 'info', variant: 'accent', text: 'Decision trees are the building blocks of the most powerful ML algorithms: Random Forest, Gradient Boosting (XGBoost, LightGBM), and AdaBoost all combine trees into ensembles.' },
        ],
      },
    ],
    conclusion: 'Decision trees are intuitive, interpretable, and form the foundation for powerful ensemble methods like Random Forest and Gradient Boosting.',
    references: [
      { title: 'Classification and Regression Trees', authors: 'Breiman, Friedman, Olshen, Stone', url: 'https://doi.org/10.1201/9781315139470' },
    ],
  },

  /* ---- 12. Bias Variance Tradeoff ---- */
  {
    slug: 'bias-variance',
    title: 'The Bias-Variance Tradeoff',
    subtitle: 'Balancing Underfitting and Overfitting',
    authors: 'Jared Wilber',
    date: 'December 2023',
    thumbnail: `${BASE}/thumbnail-bias-variance.jpg`,
    sections: [
      {
        heading: 'Decomposing Error',
        blocks: [
          { type: 'text', html: 'The total prediction error can be decomposed into <strong>bias</strong> (error from wrong assumptions), <strong>variance</strong> (sensitivity to training data), and <strong>irreducible noise</strong>.' },
          { type: 'formula', math: 'E[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2', label: 'Bias-variance decomposition' },
          { type: 'chart', chart: 'area', title: 'Bias vs. Variance vs. Total Error', description: 'The U-shaped total error curve as model complexity increases', interactive: true },
        ],
      },
      {
        heading: 'Interactive: LOESS and KNN',
        blocks: [
          { type: 'text', html: 'Adjust the smoothing parameter to see how bias and variance change. Low smoothing = low bias, high variance (overfitting). High smoothing = high bias, low variance (underfitting).' },
          { type: 'chart', chart: 'scatter', title: 'LOESS Smoothing Parameter', description: 'Adjust to see the bias-variance effect in real-time', interactive: true },
          { type: 'text', html: '<strong>Learning curves</strong> (training error vs. validation error as a function of training set size) are the most practical diagnostic tool. If both converge to a high value, the model has high bias. If they diverge widely, the model has high variance.' },
          { type: 'info', variant: 'accent', text: 'Practical rule: high bias → add features or use a more complex model. High variance → add data, add regularization, or simplify the model.' },
        ],
      },
    ],
    conclusion: 'The bias-variance tradeoff is a fundamental concept in ML. Finding the sweet spot between underfitting and overfitting is the central challenge of model selection.',
    references: [
      { title: 'Elements of Statistical Learning', authors: 'Hastie, Tibshirani, Friedman', url: 'https://hastie.su.domains/ElemStatLearn/' },
    ],
  },

  /* ---- 13. Double Descent: Visual ---- */
  {
    slug: 'double-descent',
    title: 'Double Descent: A Visual Introduction',
    subtitle: 'The Surprising Behavior of Modern ML Models',
    authors: 'Jared Wilber',
    date: 'January 2024',
    thumbnail: `${BASE}/thumbnail-double-descent.jpg`,
    sections: [
      {
        heading: 'The Double Descent Phenomenon',
        blocks: [
          { type: 'text', html: 'In classical ML, test error follows a U-shape as model complexity increases. But in modern deep learning, test error can <strong>decrease again</strong> past the interpolation threshold — this is <strong>double descent</strong>.' },
          { type: 'chart', chart: 'line', title: 'Prediction Error vs. Model Complexity', description: 'The classic U-shape followed by a second descent', interactive: true },
          { type: 'text', html: 'The interpolation regime — where the model perfectly fits the training data — is where test error peaks before descending again.' },
          { type: 'info', variant: 'accent', text: 'This phenomenon challenges the classical bias-variance tradeoff and suggests that overparameterized models can generalize well.' },
          { type: 'text', html: 'In the <strong>classical regime</strong> (parameters < data points), there are not enough parameters to fit the noise. In the <strong>interpolation regime</strong> (parameters = data points), the model barely fits. Beyond this threshold, the model has <strong>excess capacity</strong> and gradient descent selects the simplest interpolating solution.' },
        ],
      },
    ],
    conclusion: 'Double descent reveals that our classical understanding of generalization is incomplete. Modern overparameterized models can achieve remarkable generalization despite perfectly fitting training data.',
    references: [
      { title: 'Deep Double Descent', authors: 'Nakkiran et al., 2019', url: 'https://arxiv.org/abs/1912.02292' },
    ],
  },

  /* ---- 14. Double Descent: Math ---- */
  {
    slug: 'double-descent-2',
    title: 'Double Descent: A Mathematical Explanation',
    subtitle: 'Understanding the Mathematics Behind the Phenomenon',
    authors: 'Jared Wilber',
    date: 'February 2024',
    thumbnail: `${BASE}/thumbnail-double-descent2.jpg`,
    sections: [
      {
        heading: 'The Cubic Spline Model',
        blocks: [
          { type: 'text', html: 'Using <strong>cubic splines</strong> as a tractable model, we can derive the double descent curve analytically. The key insight is how the model\'s effective complexity changes near the interpolation threshold.' },
          { type: 'formula', math: '\\hat{f}(x) = \\sum_{j=1}^{K} \\beta_j B_j(x)', label: 'Basis function expansion' },
          { type: 'chart', chart: 'scatter', title: 'Cubic Spline Fitting at Varying Complexity', description: 'Watch the fit change as the number of basis functions increases', interactive: true },
        ],
      },
      {
        heading: 'The Role of Implicit Regularization',
        blocks: [
          { type: 'text', html: 'In overparameterized settings, gradient descent acts as an <strong>implicit regularizer</strong>, selecting the minimum-norm solution among all interpolating functions.' },
          { type: 'formula', math: '\\hat{\\beta} = X^T(XX^T)^{-1}y', label: 'Minimum-norm solution (p > n)' },
          { type: 'chart', chart: 'line', title: 'Risk Curve with Analytical Decomposition', description: 'Bias, variance, and total risk across model complexity', interactive: true },
        ],
      },
    ],
    conclusion: 'The mathematical analysis of double descent reveals how implicit regularization in overparameterized models leads to good generalization — a key insight for modern deep learning theory.',
    references: [
      { title: 'Benign Overfitting in Linear Regression', authors: 'Bartlett et al., 2020', url: 'https://arxiv.org/abs/1906.11300' },
    ],
  },

  /* ---- 15. Convolutional Neural Networks ---- */
  {
    slug: 'cnn',
    title: 'Convolutional Neural Networks',
    subtitle: 'How Machines Learn to See — From Pixels to Patterns',
    authors: 'Jared Wilber',
    date: 'March 2024',
    thumbnail: '/thumbnails/thumbnail-cnn.svg',
    sections: [
      {
        heading: 'The Convolution Operation',
        blocks: [
          { type: 'text', html: 'A <strong>convolution</strong> slides a small filter (kernel) across an input image, computing a dot product at each position. This produces a <strong>feature map</strong> that highlights specific patterns — edges, textures, or shapes.' },
          { type: 'formula', math: '(f * g)(t) = \\sum_{\\tau} f(\\tau) \\cdot g(t - \\tau)', label: 'Discrete convolution' },
          { type: 'chart', chart: 'heatmap', title: 'Feature Map After Convolution', description: 'Watch how a 3×3 edge-detection filter transforms the input', interactive: true },
          { type: 'definition', title: 'Output Size', math: 'O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1', note: 'W = input size, K = kernel size, P = padding, S = stride' },
        ],
      },
      {
        heading: 'Pooling & Hierarchical Features',
        blocks: [
          { type: 'text', html: '<strong>Max pooling</strong> downsamples feature maps by taking the maximum value in each window. This provides translation invariance and reduces computation.' },
          { type: 'formula', math: 'y_{i,j} = \\max_{(p,q) \\in R_{i,j}} x_{p,q}', label: 'Max pooling' },
          { type: 'chart', chart: 'architecture', title: 'CNN Architecture: LeNet-5', description: 'Classic CNN: Conv → Pool → Conv → Pool → FC → Output', interactive: true },
          { type: 'info', variant: 'accent', text: 'Modern architectures like ResNet use skip connections to train networks with 100+ layers, solving the vanishing gradient problem in deep CNNs.' },
        ],
      },
      {
        heading: 'Training a CNN',
        blocks: [
          { type: 'text', html: 'CNNs learn filters automatically through <strong>backpropagation</strong>. Early layers detect edges, middle layers detect shapes, and deep layers detect complex objects.' },
          { type: 'chart', chart: 'area', title: 'Training & Validation Loss', description: 'How a CNN learns to classify images over epochs', interactive: true },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial W_{ij}} = \\sum_m \\sum_n \\frac{\\partial L}{\\partial O_{mn}} \\cdot \\frac{\\partial O_{mn}}{\\partial W_{ij}}', label: 'Gradient w.r.t. weights' },
          { type: 'info', variant: 'emerald', text: 'Data augmentation (rotation, flip, crop, color jitter) is essential for CNNs. It artificially expands the training set and teaches the network invariance to transformations.' },
          { type: 'text', html: '<strong>Real-world applications</strong>: medical image analysis (detecting tumors in X-rays), self-driving cars (object detection), satellite imagery analysis, facial recognition, and industrial quality inspection.' },
        ],
      },
    ],
    conclusion: 'CNNs revolutionized computer vision and remain the backbone of image understanding systems — from medical imaging to self-driving cars. Their hierarchical feature learning mirrors how the visual cortex processes information.',
    references: [
      { title: 'Gradient-Based Learning Applied to Document Recognition', authors: 'LeCun et al., 1998', url: 'http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf' },
      { title: 'Deep Residual Learning for Image Recognition', authors: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
    ],
  },

  /* ---- 16. Recurrent Neural Networks & LSTMs ---- */
  {
    slug: 'rnn-lstm',
    title: 'RNNs & LSTMs',
    subtitle: 'Learning from Sequences — Memory in Neural Networks',
    authors: 'Jared Wilber',
    date: 'April 2024',
    thumbnail: '/thumbnails/thumbnail-rnn.svg',
    sections: [
      {
        heading: 'The Recurrence',
        blocks: [
          { type: 'text', html: 'Recurrent Neural Networks process sequences one element at a time, maintaining a <strong>hidden state</strong> that acts as memory. At each timestep, the hidden state is updated using the current input and the previous state.' },
          { type: 'formula', math: 'h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)', label: 'RNN hidden state update' },
          { type: 'chart', chart: 'architecture', title: 'Unrolled RNN Over Time', description: 'The recurrent connections unrolled across timesteps', interactive: true },
          { type: 'text', html: 'While elegant, vanilla RNNs suffer from the <strong>vanishing gradient problem</strong> — gradients shrink exponentially as they propagate back through time, making long-range dependencies impossible to learn.' },
        ],
      },
      {
        heading: 'Long Short-Term Memory (LSTM)',
        blocks: [
          { type: 'text', html: 'LSTMs solve the vanishing gradient problem using a <strong>cell state</strong> and three <strong>gates</strong> that control the flow of information.' },
          { type: 'formula', math: 'f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)', label: 'Forget gate' },
          { type: 'formula', math: 'i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i), \\quad \\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C)', label: 'Input gate & candidate' },
          { type: 'formula', math: 'C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t', label: 'Cell state update' },
          { type: 'formula', math: 'o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o), \\quad h_t = o_t \\odot \\tanh(C_t)', label: 'Output gate & hidden state' },
          { type: 'info', variant: 'emerald', text: 'The forget gate is the key innovation — it lets the LSTM selectively remember or discard information, enabling learning over hundreds of timesteps.' },
        ],
      },
      {
        heading: 'Sequence Modeling in Practice',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Perplexity vs. Training Epochs', description: 'How LSTM language models improve over time', interactive: true },
          { type: 'chart', chart: 'area', title: 'Gradient Norm Over Timesteps', description: 'Comparing gradient flow: vanilla RNN vs. LSTM', interactive: true },
          { type: 'text', html: '<strong>GRU (Gated Recurrent Unit)</strong> simplifies LSTM to two gates (reset and update), reducing parameters while maintaining similar performance. In practice, GRU and LSTM perform comparably on most tasks.' },
          { type: 'info', variant: 'accent', text: 'Applications of RNNs/LSTMs: machine translation (before Transformers), speech recognition, time-series forecasting, music generation, and handwriting recognition.' },
        ],
      },
    ],
    conclusion: 'LSTMs and their variants (GRUs, bidirectional LSTMs) were the dominant architecture for sequence modeling for over a decade. While Transformers have largely superseded them, understanding recurrence is fundamental to understanding sequential reasoning in modern models.',
    references: [
      { title: 'Long Short-Term Memory', authors: 'Hochreiter & Schmidhuber, 1997', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf' },
      { title: 'Understanding LSTM Networks', authors: 'Christopher Olah, 2015', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/' },
    ],
  },

  /* ---- 17. Generative Adversarial Networks ---- */
  {
    slug: 'gan',
    title: 'Generative Adversarial Networks',
    subtitle: 'Two Networks, One Game — Learning to Generate from Noise',
    authors: 'Jared Wilber',
    date: 'May 2024',
    thumbnail: '/thumbnails/thumbnail-gan.svg',
    sections: [
      {
        heading: 'The Minimax Game',
        blocks: [
          { type: 'text', html: 'A GAN consists of two networks: a <strong>Generator</strong> G that creates fake data from noise, and a <strong>Discriminator</strong> D that tries to distinguish real from fake. They play a minimax game.' },
          { type: 'formula', math: '\\min_G \\max_D \\; V(D,G) = \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]', label: 'GAN objective' },
          { type: 'chart', chart: 'architecture', title: 'GAN Architecture', description: 'Generator creates fakes, Discriminator judges them', interactive: true },
          { type: 'text', html: 'At the Nash equilibrium, the generator produces samples indistinguishable from real data, and the discriminator outputs 0.5 for all inputs.' },
        ],
      },
      {
        heading: 'Training Dynamics',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Generator vs. Discriminator Loss', description: 'The adversarial training dynamics over epochs', interactive: true },
          { type: 'formula', math: 'D_{KL}(p_{data} \\| p_g) = \\sum_x p_{data}(x) \\log \\frac{p_{data}(x)}{p_g(x)}', label: 'KL Divergence (mode collapse measure)' },
          { type: 'info', variant: 'amber', text: 'Mode collapse: when the generator learns to produce only a narrow set of outputs, ignoring the diversity of the real distribution. WGAN and spectral normalization help mitigate this.' },
          { type: 'chart', chart: 'scatter', title: 'Generated Samples in Latent Space', description: 'How noise vectors map to generated outputs', interactive: true },
          { type: 'text', html: '<strong>WGAN</strong> replaces the binary discriminator with a critic that estimates the Wasserstein distance, providing more stable training and better convergence signals.' },
          { type: 'info', variant: 'emerald', text: 'Modern generative AI has largely moved from GANs to <strong>diffusion models</strong> (Stable Diffusion, DALL-E). Diffusion models train to denoise data iteratively, avoiding mode collapse entirely.' },
        ],
      },
    ],
    conclusion: 'GANs sparked a revolution in generative AI — from StyleGAN faces to CycleGAN style transfer. Though diffusion models have overtaken them for image generation, the adversarial training paradigm remains influential in RLHF and AI safety.',
    references: [
      { title: 'Generative Adversarial Nets', authors: 'Goodfellow et al., 2014', url: 'https://arxiv.org/abs/1406.2661' },
      { title: 'A Style-Based Generator Architecture for GANs', authors: 'Karras et al., 2018', url: 'https://arxiv.org/abs/1812.04948' },
    ],
  },

  /* ---- 18. Transformers & Self-Attention ---- */
  {
    slug: 'transformer',
    title: 'Transformers & Self-Attention',
    subtitle: 'The Architecture Behind GPT, BERT, and Modern AI',
    authors: 'Jared Wilber',
    date: 'June 2024',
    thumbnail: '/thumbnails/thumbnail-transformer.svg',
    sections: [
      {
        heading: 'Scaled Dot-Product Attention',
        blocks: [
          { type: 'text', html: 'The <strong>self-attention mechanism</strong> allows each token to attend to every other token in the sequence. Queries, Keys, and Values are computed via linear projections.' },
          { type: 'formula', math: '\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V', label: 'Scaled dot-product attention' },
          { type: 'chart', chart: 'heatmap', title: 'Self-Attention Weights', description: 'Which tokens attend to which — the attention pattern', interactive: true },
          { type: 'definition', title: 'Multi-Head Attention', math: '\\text{MultiHead}(Q,K,V) = \\text{Concat}(head_1, \\ldots, head_h) W^O', note: 'Each head learns different attention patterns — syntax, semantics, position.' },
        ],
      },
      {
        heading: 'The Full Transformer Block',
        blocks: [
          { type: 'text', html: 'A Transformer block consists of <strong>multi-head self-attention</strong> followed by a <strong>feed-forward network</strong>, with <strong>layer normalization</strong> and <strong>residual connections</strong>.' },
          { type: 'formula', math: '\\text{FFN}(x) = \\max(0, xW_1 + b_1)W_2 + b_2', label: 'Feed-forward network (GeLU in practice)' },
          { type: 'formula', math: '\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\cdot \\gamma + \\beta', label: 'Layer normalization' },
          { type: 'chart', chart: 'architecture', title: 'Transformer Encoder-Decoder Architecture', description: 'The full "Attention Is All You Need" architecture', interactive: true },
        ],
      },
      {
        heading: 'Positional Encoding & Scaling',
        blocks: [
          { type: 'text', html: 'Unlike RNNs, Transformers have no inherent notion of order. <strong>Positional encodings</strong> inject sequence position information into the embeddings.' },
          { type: 'formula', math: 'PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right), \\quad PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)', label: 'Sinusoidal positional encoding' },
          { type: 'chart', chart: 'line', title: 'Model Performance vs. Scale', description: 'How Transformer performance scales with parameters and data', interactive: true },
          { type: 'info', variant: 'accent', text: 'Scaling laws: performance improves predictably as a power law of model size, dataset size, and compute budget — the foundation of the "bigger is better" paradigm.' },
          { type: 'text', html: '<strong>Modern Transformer variants</strong>: GPT (decoder-only, autoregressive), BERT (encoder-only, masked LM), T5 (encoder-decoder, text-to-text). Most current LLMs use the decoder-only architecture.' },
          { type: 'definition', title: 'KV Cache (Inference)', math: 'O(N^2d) \\to O(Nd) \\text{ per token}', note: 'Pre-computing Key-Value pairs for past tokens avoids redundant computation during autoregressive generation.' },
        ],
      },
    ],
    conclusion: 'The Transformer architecture is the foundation of modern AI — powering GPT-4, Claude, Gemini, and virtually every state-of-the-art model. Its parallelizable self-attention mechanism made training on massive datasets feasible, ushering in the era of large language models.',
    references: [
      { title: 'Attention Is All You Need', authors: 'Vaswani et al., 2017', url: 'https://arxiv.org/abs/1706.03762' },
      { title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al., 2020', url: 'https://arxiv.org/abs/2001.08361' },
    ],
  },

  /* ---- 19. Autoencoders & VAEs ---- */
  {
    slug: 'autoencoder',
    title: 'Autoencoders & VAEs',
    subtitle: 'Learning Compressed Representations of Data',
    authors: 'Jared Wilber',
    date: 'July 2024',
    thumbnail: '/thumbnails/thumbnail-autoencoder.svg',
    sections: [
      {
        heading: 'The Encoder-Decoder Framework',
        blocks: [
          { type: 'text', html: 'An <strong>autoencoder</strong> learns to compress input data into a low-dimensional <strong>latent representation</strong>, then reconstruct it. The bottleneck forces the network to learn efficient encodings.' },
          { type: 'formula', math: 'z = f_{enc}(x), \\quad \\hat{x} = f_{dec}(z), \\quad L = \\|x - \\hat{x}\\|^2', label: 'Encode → Decode → Reconstruction loss' },
          { type: 'chart', chart: 'architecture', title: 'Autoencoder Architecture', description: 'Encoder compresses, Decoder reconstructs', interactive: true },
        ],
      },
      {
        heading: 'Variational Autoencoders (VAE)',
        blocks: [
          { type: 'text', html: 'VAEs add a probabilistic twist: the encoder outputs a <strong>distribution</strong> (mean and variance) rather than a fixed vector. The <strong>reparameterization trick</strong> enables backpropagation through sampling.' },
          { type: 'formula', math: 'z = \\mu + \\sigma \\odot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)', label: 'Reparameterization trick' },
          { type: 'formula', math: 'L_{VAE} = \\underbrace{-\\mathbb{E}_{q(z|x)}[\\log p(x|z)]}_{\\text{reconstruction}} + \\underbrace{D_{KL}(q(z|x) \\| p(z))}_{\\text{regularization}}', label: 'ELBO loss' },
          { type: 'chart', chart: 'scatter', title: 'VAE Latent Space', description: 'How data points cluster in the learned 2D latent space', interactive: true },
          { type: 'info', variant: 'emerald', text: 'The KL divergence term acts as a regularizer, pushing the latent distribution toward a standard normal — enabling smooth interpolation and generation.' },
          { type: 'text', html: '<strong>VQ-VAE</strong> (Vector Quantized VAE) uses a discrete latent space with a codebook, producing sharper reconstructions. It powers many modern image and audio generation models.' },
        ],
      },
    ],
    conclusion: 'Autoencoders and VAEs are foundational to representation learning. VAEs in particular laid the groundwork for modern generative models, and their latent space interpretation remains a powerful tool for understanding learned representations.',
    references: [
      { title: 'Auto-Encoding Variational Bayes', authors: 'Kingma & Welling, 2013', url: 'https://arxiv.org/abs/1312.6114' },
    ],
  },

  /* ---- 20. Attention Mechanism Deep Dive ---- */
  {
    slug: 'attention',
    title: 'Attention Mechanisms',
    subtitle: 'From Bahdanau to Multi-Head — How Models Focus',
    authors: 'Jared Wilber',
    date: 'August 2024',
    thumbnail: '/thumbnails/thumbnail-attention.svg',
    sections: [
      {
        heading: 'Additive (Bahdanau) Attention',
        blocks: [
          { type: 'text', html: 'The original attention mechanism computes alignment scores between a decoder state and each encoder hidden state, producing a <strong>context vector</strong> as a weighted sum.' },
          { type: 'formula', math: 'e_{ij} = a(s_{i-1}, h_j), \\quad \\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_k \\exp(e_{ik})}, \\quad c_i = \\sum_j \\alpha_{ij} h_j', label: 'Bahdanau attention' },
          { type: 'chart', chart: 'heatmap', title: 'Attention Alignment Matrix', description: 'How decoder tokens attend to encoder tokens in translation', interactive: true },
        ],
      },
      {
        heading: 'Attention Variants',
        blocks: [
          { type: 'text', html: '<strong>Luong attention</strong> simplifies the score function to a dot product. <strong>Cross-attention</strong> lets one sequence attend to another. <strong>Causal (masked) attention</strong> prevents attending to future tokens — essential for autoregressive generation.' },
          { type: 'formula', math: '\\text{score}(Q, K) = \\begin{cases} QK^T / \\sqrt{d_k} & \\text{dot-product} \\\\ v^T \\tanh(W_1 Q + W_2 K) & \\text{additive} \\end{cases}', label: 'Attention score functions' },
          { type: 'chart', chart: 'line', title: 'Attention Entropy Over Layers', description: 'How attention becomes more focused in deeper layers', interactive: true },
          { type: 'info', variant: 'accent', text: 'Flash Attention: an algorithm that computes exact attention with IO-awareness, reducing memory from O(N²) to O(N) — enabling 100K+ context windows.' },
          { type: 'text', html: '<strong>Grouped Query Attention (GQA)</strong> and <strong>Multi-Query Attention (MQA)</strong> reduce KV cache memory by sharing fewer key/value heads across query heads — essential for efficient LLM inference.' },
          { type: 'definition', title: 'Sparse Attention', math: '\\text{Attention}(Q,K,V) = \\text{softmax}\\!\\left(\\frac{QK^T_{\\text{top-k}}}{\\sqrt{d_k}}\\right) V', note: 'Only attend to the top-k most relevant keys. Reduces O(N²) to O(Nk), enabling longer sequences.' },
        ],
      },
    ],
    conclusion: 'Attention is the key innovation that made Transformers possible. Understanding the evolution from additive to multi-head attention reveals how modern models process and reason about sequential information.',
    references: [
      { title: 'Neural Machine Translation by Jointly Learning to Align and Translate', authors: 'Bahdanau et al., 2014', url: 'https://arxiv.org/abs/1409.0473' },
      { title: 'FlashAttention: Fast and Memory-Efficient Attention', authors: 'Dao et al., 2022', url: 'https://arxiv.org/abs/2205.14135' },
    ],
  },

  /* ---- 21. Batch Normalization ---- */
  {
    slug: 'batch-norm',
    title: 'Batch Normalization',
    subtitle: 'Stabilizing and Accelerating Deep Network Training',
    authors: 'Jared Wilber',
    date: 'September 2024',
    thumbnail: '/thumbnails/thumbnail-batchnorm.svg',
    sections: [
      {
        heading: 'Internal Covariate Shift',
        blocks: [
          { type: 'text', html: 'As a deep network trains, the distribution of inputs to each layer changes — this <strong>internal covariate shift</strong> slows training. Batch Normalization fixes this by normalizing layer inputs.' },
          { type: 'formula', math: '\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta', label: 'Batch normalization' },
          { type: 'definition', title: 'Running Statistics (Inference)', math: '\\mu_{running} = \\alpha \\mu_B + (1-\\alpha)\\mu_{running}', note: 'At inference, use running mean/variance instead of batch statistics.' },
        ],
      },
      {
        heading: 'Effects on Training',
        blocks: [
          { type: 'chart', chart: 'line', title: 'Training Loss: With vs. Without BatchNorm', description: 'How BatchNorm accelerates convergence', interactive: true },
          { type: 'chart', chart: 'area', title: 'Activation Distribution Across Layers', description: 'How BatchNorm keeps activations well-distributed', interactive: true },
          { type: 'info', variant: 'emerald', text: 'BatchNorm allows higher learning rates, acts as a mild regularizer, and reduces sensitivity to initialization — making deep network training far more robust.' },
          { type: 'text', html: '<strong>Group Normalization</strong> divides channels into groups and normalizes within each group — independent of batch size. Essential for object detection and segmentation tasks where batch sizes are small.' },
          { type: 'text', html: 'In <strong>Transformers</strong>, LayerNorm is applied before each sublayer (Pre-LN) or after (Post-LN). Pre-LN is now standard as it provides more stable gradients in deep Transformers.' },
          { type: 'formula', math: '\\text{LayerNorm}(x) = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} \\gamma + \\beta \\quad \\text{(per-sample, not per-batch)}', label: 'Layer Normalization (for Transformers)' },
        ],
      },
    ],
    conclusion: 'Batch Normalization is one of the most impactful innovations in deep learning. While Layer Norm has become standard for Transformers, BatchNorm remains essential for CNNs and many other architectures.',
    references: [
      { title: 'Batch Normalization: Accelerating Deep Network Training', authors: 'Ioffe & Szegedy, 2015', url: 'https://arxiv.org/abs/1502.03167' },
    ],
  },

  /* ---- 22. Dropout & Regularization ---- */
  {
    slug: 'dropout',
    title: 'Dropout & Regularization',
    subtitle: 'Preventing Overfitting in Deep Neural Networks',
    authors: 'Jared Wilber',
    date: 'October 2024',
    thumbnail: '/thumbnails/thumbnail-dropout.svg',
    sections: [
      {
        heading: 'The Dropout Mechanism',
        blocks: [
          { type: 'text', html: '<strong>Dropout</strong> randomly zeroes a fraction of neuron outputs during training. This prevents co-adaptation and forces the network to learn robust, distributed representations.' },
          { type: 'formula', math: '\\hat{h}_i = r_i \\cdot h_i, \\quad r_i \\sim \\text{Bernoulli}(p)', label: 'Dropout mask' },
          { type: 'formula', math: 'h_{test} = p \\cdot h_{train} \\quad \\text{(inverted dropout: scale at train time)}', label: 'Inverted dropout scaling' },
          { type: 'chart', chart: 'line', title: 'Train vs. Test Accuracy: With vs. Without Dropout', description: 'How dropout prevents overfitting', interactive: true },
        ],
      },
      {
        heading: 'Regularization Techniques',
        blocks: [
          { type: 'text', html: 'Beyond dropout, deep learning uses <strong>L2 weight decay</strong>, <strong>data augmentation</strong>, <strong>early stopping</strong>, and <strong>label smoothing</strong> to combat overfitting.' },
          { type: 'formula', math: 'L_{reg} = L + \\frac{\\lambda}{2} \\|w\\|^2', label: 'L2 regularization (weight decay)' },
          { type: 'chart', chart: 'area', title: 'Effect of Dropout Rate on Generalization', description: 'Finding the optimal dropout probability', interactive: true },
          { type: 'info', variant: 'amber', text: 'Dropout at 0.5 is standard for fully-connected layers. For conv layers, 0.2–0.3 is typical. Too much dropout underfits; too little fails to regularize.' },
          { type: 'text', html: '<strong>DropConnect</strong> zeroes random weights instead of activations. <strong>Spatial dropout</strong> drops entire feature maps in CNNs, preserving spatial consistency.' },
          { type: 'definition', title: 'Stochastic Depth', math: 'h_l = h_{l-1} + p_l \\cdot F(h_{l-1}), \\quad p_l \\sim \\text{Bernoulli}(1 - \\frac{l}{L}(1-p_L))', note: 'Randomly skip entire layers during training. Deeper layers are dropped more often. Used in EfficientNet and modern architectures.' },
        ],
      },
    ],
    conclusion: 'Dropout remains one of the simplest and most effective regularization techniques. Combined with weight decay and data augmentation, it forms the regularization backbone of most deep learning systems.',
    references: [
      { title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting', authors: 'Srivastava et al., 2014', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
    ],
  },

  /* ---- 23. Transfer Learning ---- */
  {
    slug: 'transfer-learning',
    title: 'Transfer Learning',
    subtitle: 'Leveraging Pretrained Models for New Tasks',
    authors: 'Jared Wilber',
    date: 'November 2024',
    thumbnail: '/thumbnails/thumbnail-transfer.svg',
    sections: [
      {
        heading: 'Why Transfer Learning Works',
        blocks: [
          { type: 'text', html: '<strong>Transfer learning</strong> reuses a model trained on a large source dataset (e.g., ImageNet) as the starting point for a different but related target task. The pretrained features are often generalizable.' },
          { type: 'chart', chart: 'architecture', title: 'Transfer Learning Pipeline', description: 'Pretrain on source → Fine-tune on target', interactive: true },
          { type: 'text', html: 'There are three main strategies: <strong>feature extraction</strong> (freeze base, train head), <strong>fine-tuning</strong> (unfreeze some layers), and <strong>full fine-tuning</strong> (train everything with a small learning rate).' },
          { type: 'formula', math: '\\theta_{target} = \\theta_{source} - \\eta \\nabla L_{target}(\\theta_{source})', label: 'Fine-tuning from pretrained weights' },
        ],
      },
      {
        heading: 'Modern Transfer Learning: Foundation Models',
        blocks: [
          { type: 'text', html: 'Modern NLP and vision are dominated by <strong>foundation models</strong> — large models pretrained on diverse data and adapted via fine-tuning or prompting.' },
          { type: 'chart', chart: 'bar', title: 'Performance: From Scratch vs. Pretrained', description: 'How transfer learning boosts performance with less data', interactive: true },
          { type: 'formula', math: '\\text{LoRA}: W = W_0 + \\Delta W = W_0 + BA, \\quad B \\in \\mathbb{R}^{d \\times r}, A \\in \\mathbb{R}^{r \\times k}, r \\ll \\min(d,k)', label: 'LoRA: Low-Rank Adaptation' },
          { type: 'info', variant: 'accent', text: 'LoRA freezes the original weights and injects trainable low-rank matrices — reducing trainable parameters by 10,000x while matching full fine-tuning performance.' },
          { type: 'text', html: '<strong>Adapter layers</strong> add small trainable modules between frozen layers. <strong>Prompt tuning</strong> learns continuous prompt embeddings while keeping the model frozen. All are parameter-efficient fine-tuning (PEFT) methods.' },
          { type: 'text', html: 'In practice, the most common pipeline is: 1) Choose a pretrained model (Hugging Face Hub), 2) Apply LoRA with rank 8-64, 3) Train on your data for a few epochs, 4) Merge LoRA weights back into the base model for inference.' },
        ],
      },
    ],
    conclusion: 'Transfer learning has democratized deep learning — enabling practitioners to achieve state-of-the-art results with minimal data and compute. Foundation models like GPT, BERT, and CLIP have made pretrained representations the default starting point.',
    references: [
      { title: 'How transferable are features in deep neural networks?', authors: 'Yosinski et al., 2014', url: 'https://arxiv.org/abs/1411.1792' },
      { title: 'LoRA: Low-Rank Adaptation of Large Language Models', authors: 'Hu et al., 2021', url: 'https://arxiv.org/abs/2106.09685' },
    ],
  },

  /* ---- 24. Vanishing & Exploding Gradients ---- */
  {
    slug: 'vanishing-gradients',
    title: 'Vanishing & Exploding Gradients',
    subtitle: 'The Optimization Challenges of Deep Networks',
    authors: 'Jared Wilber',
    date: 'December 2024',
    thumbnail: '/thumbnails/thumbnail-gradients.svg',
    sections: [
      {
        heading: 'The Problem',
        blocks: [
          { type: 'text', html: 'During backpropagation through deep or recurrent networks, gradients are <strong>multiplied</strong> at each layer. If weights are small, gradients shrink exponentially (<strong>vanishing</strong>). If large, they grow (<strong>exploding</strong>).' },
          { type: 'formula', math: '\\frac{\\partial L}{\\partial w_1} = \\frac{\\partial L}{\\partial h_L} \\cdot \\prod_{l=2}^{L} \\frac{\\partial h_l}{\\partial h_{l-1}} \\cdot \\frac{\\partial h_1}{\\partial w_1}', label: 'Chain rule through L layers' },
          { type: 'chart', chart: 'line', title: 'Gradient Norm Across Layers', description: 'How gradients vanish or explode in deep networks', interactive: true },
        ],
      },
      {
        heading: 'Solutions',
        blocks: [
          { type: 'text', html: 'Several innovations address this: <strong>ReLU activations</strong> (avoid sigmoid saturation), <strong>residual/skip connections</strong> (gradient highway), <strong>BatchNorm</strong> (normalize activations), <strong>gradient clipping</strong> (cap exploding gradients), and careful <strong>initialization</strong>.' },
          { type: 'formula', math: 'h_l = h_{l-1} + F(h_{l-1}) \\quad \\Rightarrow \\quad \\frac{\\partial h_L}{\\partial h_l} = 1 + \\frac{\\partial}{\\partial h_l}\\sum_{k=l}^{L-1} F(h_k)', label: 'Residual connection: gradient always ≥ 1' },
          { type: 'formula', math: 'W \\sim \\mathcal{N}\\!\\left(0, \\frac{2}{n_{in}}\\right) \\quad \\text{(He initialization for ReLU)}', label: 'He initialization' },
          { type: 'chart', chart: 'area', title: 'Training Deep Networks: With vs. Without Residual Connections', description: 'How skip connections enable training of very deep networks', interactive: true },
          { type: 'info', variant: 'emerald', text: 'Gradient clipping: if ‖g‖ > threshold, scale g → g · (threshold / ‖g‖). Simple but essential for training RNNs and large language models.' },
          { type: 'text', html: '<strong>DenseNet</strong> connects every layer to every other layer, providing even richer gradient flow than ResNet. <strong>Dense blocks + transition layers</strong> create highly parameter-efficient architectures.' },
          { type: 'text', html: 'Modern LLM training combines all solutions: <strong>AdamW optimizer</strong> (adaptive LR + decoupled weight decay), <strong>RMSNorm</strong> (simplified LayerNorm), <strong>RoPE</strong> (rotary position embeddings), and <strong>gradient checkpointing</strong> (trades compute for memory).' },
        ],
      },
    ],
    conclusion: 'The vanishing/exploding gradient problem was the central obstacle to training deep networks. The solutions — ReLU, skip connections, normalization, and careful initialization — are the building blocks of every modern architecture.',
    references: [
      { title: 'On the difficulty of training recurrent neural networks', authors: 'Pascanu, Mikolov, Bengio, 2013', url: 'https://arxiv.org/abs/1211.5063' },
      { title: 'Deep Residual Learning for Image Recognition', authors: 'He et al., 2015', url: 'https://arxiv.org/abs/1512.03385' },
    ],
  },
]

/** Lookup helper */
export function getChapter(slug: string): ArticleChapter | undefined {
  return chapters.find((c) => c.slug === slug)
}
