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
  chart: 'beeswarm' | 'bar' | 'line' | 'roc' | 'scatter' | 'area' | 'sigmoid' | 'tree' | 'forest'
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
]

/** Lookup helper */
export function getChapter(slug: string): ArticleChapter | undefined {
  return chapters.find((c) => c.slug === slug)
}
